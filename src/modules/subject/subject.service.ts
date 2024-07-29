import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SubjectCreateInput) {
    const nameExists = await this.prisma.subject.findFirst({
      where: { name: data.name },
    });
    if (nameExists) {
      throw new Error("Já existe uma disciplina registrada com esse nome.");
    }

    const subject = await this.prisma.subject.create({
      data: {
        ...data,
      },
    });
    return subject;
  }

  async find() {
    const subjects = await this.prisma.subject.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        subjectsPerGrade: {
          orderBy: [{ grade: { name: "asc" } }],
          include: {
            grade: true,
          },
        },
      },
    });

    return subjects;
  }

  async findSubjectsPerClass() {
    const grades = await this.prisma.grade.findMany({
      include: {
        classes: {
          select: {
            id: true,
            section: true,
          },
          orderBy: [{ section: "asc" }],
        },
      },
      orderBy: [{ name: "asc" }],
    });
    const dict = {};
    grades.forEach((grade) => {
      dict[grade.id] = grade.classes.map((_class) => ({
        id: _class.id,
        name: `${grade.name} - ${_class.section}`,
      }));
    });

    const subjects = await this.prisma.subject.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        subjectsPerGrade: {
          orderBy: [{ grade: { name: "asc" } }],
          select: {
            id: true,
            gradeId: true,
          },
        },
      },
    });

    const res = subjects.map((subject) => {
      const classes = [];
      subject.subjectsPerGrade.forEach((subjectPerGrade) => {
        // subject.id
        // subjectPerGrade.id
        // subjectPerGrade.gradeId
        classes.push(
          ...(dict[subjectPerGrade.gradeId] || []).map((el) => ({
            ...el,
            subjectPerGradeId: subjectPerGrade.id,
          }))
        );
      });
      return {
        id: subject.id,
        name: subject.name,
        classes,
      };
    });

    return res;
  }

  async findOne(id: string) {
    const subject = await this.prisma.subject.findFirst({
      where: { id },
    });

    if (!subject) {
      throw new Error("Subject not found");
    }

    return subject;
  }

  async update(id: string, data: Prisma.SubjectUpdateInput) {
    const subjectExists = await this.prisma.subject.findFirst({
      where: { name: String(data.name) },
    });
    if (subjectExists && subjectExists.id !== id)
      throw new Error("Já existe uma disciplina registrada com esse nome.");

    const existants = [];
    const news = [];

    await Promise.all(
      (data.subjectsPerGrade.create as any[]).map(async (el) => {
        const found = await this.prisma.subjectPerGrade.findFirst({
          where: {
            subjectId: id,
            gradeId: el.grade.connect.id,
          },
        });
        if (found) {
          const res = await this.prisma.subjectPerGrade.update({
            where: {
              id: found.id,
            },
            data: {
              numWeeklyLessons: el.numWeeklyLessons,
            },
          });
          existants.push(found.id); // when object already exists
        } else {
          news.push(el);
        }
      })
    );
    data.subjectsPerGrade.create = news; // create only new objects

    // delete objects that should no more exist
    await this.prisma.subjectPerGrade.deleteMany({
      where: { subjectId: id, id: { notIn: existants } },
    });

    const subject = await this.prisma.subject.update({
      where: { id },
      data: {
        ...data,
      },
    });

    if (!subject) {
      throw new Error("Disciplina não encontrada");
    }

    return subject;
  }

  async remove(id: string) {
    const hasSubject = await this.prisma.teacher.findFirst({
      where: { subjectsPerClass: { some: { subjectPerGrade: { subjectId: id } } } },
    });
    if (hasSubject)
      throw new Error("Existem professores que dependem dessa disciplina.");
    
    await this.prisma.$transaction(async (prisma) => {
      // Delete related SubjectPerGrade records
      await prisma.subjectPerGrade.deleteMany({
        where: { subjectId: id },
      });
  
      // Delete the Subject
      await prisma.subject.delete({
        where: { id },
      });
    });
  }
}
