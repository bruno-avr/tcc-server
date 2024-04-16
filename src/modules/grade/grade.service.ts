import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GradeCreateInput) {
    if (!data.name) throw new Error('O campo "nome" é obrigatório.');
    const nameExists = await this.prisma.grade.findFirst({
      where: { name: data.name },
    });

    if (nameExists)
      throw new Error("Já existe uma série registrada com esse nome.");

    const grade = await this.prisma.grade.create({
      data: {
        ...data,
      },
    });
    return grade;
  }

  async find() {
    const dirtyGrades = await this.prisma.grade.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        subjectsPerGrade: {
          include: {
            subject: true,
          },
          orderBy: [{ subject: { name: "asc" } }],
        },
        classes: {
          orderBy: [{ name: "asc" }],
        },
      },
    });

    const grades = dirtyGrades.map((dirtyGrade) => {
      const grade: any = dirtyGrade;
      grade.subjects = grade.subjectsPerGrade.map((subjectPerGrade) => ({
        name: subjectPerGrade.subject.name,
        numWeeklyLessons: subjectPerGrade.numWeeklyLessons,
      }));
      delete grade.subjectsPerGrade;
      return grade;
    });

    return grades;
  }

  async findOne(id: string) {
    const grade = await this.prisma.grade.findFirst({
      where: { id },
    });

    if (!grade) {
      throw new Error("Série não encontrada");
    }

    return grade;
  }

  async update(id: string, data: Prisma.GradeUpdateInput) {
    if (!data.name) throw new Error('O campo "nome" é obrigatório.');

    const nameExists = await this.prisma.grade.findFirst({
      where: { name: String(data.name) },
    });

    if (nameExists)
      throw new Error("Já existe uma série registrada com esse nome.");

    const grade = await this.prisma.grade.update({
      where: { id },
      data: { name: data.name },
    });

    if (!grade) {
      throw new Error("Série não encontrada");
    }

    return grade;
  }

  async remove(id: string) {
    const hasSubject = await this.prisma.subject.findFirst({
      where: { numLessonsPerGrade: { some: { gradeId: id } } },
    });
    if (hasSubject)
      throw new Error("Existem disciplinas que dependem dessa série.");

    const hasClass = await this.prisma.class.findFirst({
      where: { gradeId: id },
    });
    if (hasClass) throw new Error("Existem turmas que dependem dessa série.");

    await this.prisma.grade.delete({ where: { id } });
  }
}
