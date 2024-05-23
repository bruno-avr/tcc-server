import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import CPPBridge from "src/utils/CPPBridge";

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async generate(defaultSchedule = null) {
    const cppBridge = new CPPBridge(
      defaultSchedule ? "fixed_recalculation" : "calculation"
    );

    let teachers = await this.prisma.teacher.findMany({
      include: {
        subjectsPerClass: {
          select: {
            id: true,
            classId: true,
            subjectPerGrade: {
              select: {
                subjectId: true,
              },
            },
          },
        },
      },
    });
    teachers = teachers.filter((teacher) => teacher.subjectsPerClass.length);

    cppBridge.appendLine(teachers.length); // number of teachers

    teachers.forEach((teacher) => {
      cppBridge.appendLine([teacher.id, teacher.subjectsPerClass.length]);
      teacher.subjectsPerClass.forEach((subjectPerClass) => {
        cppBridge.appendLine([
          subjectPerClass.subjectPerGrade.subjectId,
          subjectPerClass.classId,
        ]);
      });
    });

    let grades = await this.prisma.grade.findMany({
      include: {
        subjectsPerGrade: true,
      },
    });

    cppBridge.appendLine(grades.length);

    let totalLessonsPerGrade = {};
    grades.forEach((grade) => {
      totalLessonsPerGrade[grade.id] = 0;
      cppBridge.appendLine([grade.id, grade.subjectsPerGrade.length]);
      grade.subjectsPerGrade.forEach((subjectPerGrade) => {
        cppBridge.appendLine([
          subjectPerGrade.subjectId,
          subjectPerGrade.numWeeklyLessons,
        ]);
        totalLessonsPerGrade[grade.id] += subjectPerGrade.numWeeklyLessons;
      });
    });

    let classes = await this.prisma.class.findMany({
      include: {
        grade: {
          select: {
            name: true,
          },
        },
      },
    });
    const invalidClass = classes.find(
      (_class) =>
        _class.availableTimeSlots.length < totalLessonsPerGrade[_class.gradeId]
    );
    if (invalidClass) {
      throw new Error(
        `A turma "${invalidClass.grade.name} - ${
          invalidClass.section
        }" precisa de no mínimo ${
          totalLessonsPerGrade[invalidClass.gradeId]
        } horários de aula, mas só foram cadastrados ${
          invalidClass.availableTimeSlots.length
        } horários.`
      );
    }

    cppBridge.appendLine(classes.length);

    classes.forEach((_class) => {
      cppBridge.appendLine([
        _class.id,
        _class.gradeId,
        _class.availableTimeSlots.length,
      ]);
      if (!defaultSchedule) {
        cppBridge.appendLine(_class.availableTimeSlots);
      } else {
        _class.availableTimeSlots.forEach((timeSlot) => {
          cppBridge.appendLine([
            timeSlot,
            defaultSchedule[_class.id][timeSlot].subjectId,
            defaultSchedule[_class.id][timeSlot].teacherId,
            defaultSchedule[_class.id][timeSlot].isFixed,
          ]);
        });
      }
    });

    const res = await cppBridge.processInput();

    await Promise.all(
      res.schedules.map(async (schedule) => {
        const _class = await this.prisma.class.findFirst({
          where: { id: schedule.classId },
          select: { section: true, grade: { select: { name: true } } },
        });
        schedule.className = `${_class.grade.name} - ${_class.section}`;
        await Promise.all(
          schedule.lessons.map(async (lesson) => {
            if (lesson.subjectId === "EMPTY") {
              lesson.empty = true;
              delete lesson.subjectId;
              return;
            }

            const subject = await this.prisma.subject.findFirst({
              where: { id: lesson.subjectId },
              select: { id: true, name: true },
            });
            delete lesson.subjectId;
            lesson.subject = subject;

            const subjectPerClass = await this.prisma.subjectPerClass.findFirst(
              {
                where: {
                  classId: schedule.classId,
                  subjectPerGrade: { subjectId: subject.id },
                },
                select: {
                  teacher: { select: { id: true, name: true } },
                },
              }
            );
            if (subjectPerClass) {
              lesson.teacher = subjectPerClass.teacher;
            }
          })
        );
      })
    );
    res.schedules.sort((el1, el2) =>
      el1.className.localeCompare(el2.className)
    );

    return res;
  }
}
