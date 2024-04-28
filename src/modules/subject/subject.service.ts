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
        numLessonsPerGrade: {
          orderBy: [{ grade: { name: "asc" } }],
          include: {
            grade: true,
          },
        },
      },
    });

    return subjects;
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
}
