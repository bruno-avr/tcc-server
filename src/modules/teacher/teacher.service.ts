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
    });

    return { data: teachers };
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
}
