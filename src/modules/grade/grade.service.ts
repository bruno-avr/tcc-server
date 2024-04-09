import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GradeCreateInput) {
    // const nameExists = await this.prisma.grade.findFirst({
    //   where: { name: data.name },
    // });

    // if (nameExists) {
    //   throw new Error("Grade name already registered");
    // }
    const grade = await this.prisma.grade.create({
      data: {
        ...data,
      },
    });
    return grade;
  }

  async find() {
    const grades = await this.prisma.grade.findMany({
      orderBy: [{ name: "asc" }],
    });

    return grades;
  }

  async findOne(id: string) {
    const grade = await this.prisma.grade.findFirst({
      where: { id },
    });

    if (!grade) {
      throw new Error("Grade not found");
    }

    return grade;
  }
}
