import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TeacherCreateInput) {
    const nameExists = await this.prisma.teacher.findFirst({
      where: { name: data.name },
    });

    if (nameExists) {
      throw new Error("Teacher name already registered");
    }
    const teacher = await this.prisma.teacher.create({
      data: {
        ...data,
      },
    });
    return teacher;
  }

  async find() {
    const teachers = await this.prisma.teacher.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        subjectsPerClass: {
          include: {
            class: {
              select: {
                id: true,
                section: true,
              },
            },
            subjectPerGrade: {
              select: {
                id: true,
                grade: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                subject: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const processedTeachers = teachers.map((teacher) => {
      const selectedClasses = {};
      const classesPerSubjectObj = {};

      teacher.subjectsPerClass.forEach((subjectPerClass) => {
        const className = `${subjectPerClass.subjectPerGrade.grade.name} - ${subjectPerClass.class.section}`;

        const subjectName = subjectPerClass.subjectPerGrade.subject.name;
        if (!(subjectName in classesPerSubjectObj))
          classesPerSubjectObj[subjectName] = [];
        classesPerSubjectObj[subjectName].push(className);

        const subjectId = subjectPerClass.subjectPerGrade.subject.id;
        if (!(subjectId in selectedClasses)) selectedClasses[subjectId] = [];
        selectedClasses[subjectId].push({
          id: subjectPerClass.class.id,
          name: className,
          subjectPerGradeId: subjectPerClass.subjectPerGradeId,
        });
      });

      const classesPerSubject = [];
      for (const key in classesPerSubjectObj) {
        classesPerSubject.push({
          name: key,
          classes: classesPerSubjectObj[key],
        });
      }

      return {
        id: teacher.id,
        name: teacher.name,
        selectedClasses,
        classesPerSubject,
      };
    });

    return processedTeachers;
  }

  async findOne(id: string) {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id },
    });

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    return teacher;
  }

  async update(id: string, data: Prisma.TeacherUpdateInput) {
    const teacherExists = await this.prisma.teacher.findFirst({
      where: { name: String(data.name) },
    });
    if (teacherExists && teacherExists.id !== id)
      throw new Error("Já existe um professor registrado com esse nome.");

    const existants = [];
    const news = [];

    await Promise.all(
      (data.subjectsPerClass.create as any[]).map(async (el) => {
        const found = await this.prisma.subjectPerClass.findFirst({
          where: {
            teacherId: id,
            classId: el.class.connect.id,
            subjectPerGradeId: el.subjectPerGrade.connect.id,
          },
        });
        if (found) {
          existants.push(found.id); // when object already exists
        } else {
          news.push(el);
        }
      })
    );
    data.subjectsPerClass.create = news; // create only new objects

    // delete objects that should no more exist
    await this.prisma.subjectPerClass.deleteMany({
      where: { teacherId: id, id: { notIn: existants } },
    });

    const teacher = await this.prisma.teacher.update({
      where: { id },
      data: {
        ...data,
      },
    });

    if (!teacher) {
      throw new Error("Professor não encontrado");
    }

    return teacher;
  }
}
