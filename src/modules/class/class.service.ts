import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClassCreateInput) {
    if (!data.grade.connect.id)
      throw new Error('O campo "Série" é obrigatório.');
    if (!data.section)
      throw new Error('O campo "Código da Turma" é obrigatório.');
    const classExists = await this.prisma.class.findFirst({
      where: { gradeId: data.grade.connect.id, section: data.section },
    });

    if (classExists)
      throw new Error("Já existe uma turma registrada com esse nome.");

    const _class = await this.prisma.class.create({
      data: {
        ...data,
      },
    });
    return _class;
  }

  async find() {
    const classes = await this.prisma.class.findMany({
      include: {
        grade: true,
      },
      orderBy: [{ grade: { name: "asc" } }, { section: "asc" }],
    });

    return classes;
  }

  async findOne(id: string) {
    const _class = await this.prisma.class.findFirst({
      where: { id },
    });

    if (!_class) {
      throw new Error("Class not found");
    }

    return _class;
  }
}
