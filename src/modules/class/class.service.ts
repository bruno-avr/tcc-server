import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClassCreateInput) {
    // const nameExists = await this.prisma.class.findFirst({
    //   where: { name: data.name },
    // });

    // if (nameExists) {
    //   throw new Error("Class name already registered");
    // }
    const _class = await this.prisma.class.create({
      data: {
        ...data,
      },
    });
    return _class;
  }

  async find() {
    const classes = await this.prisma.class.findMany({
      orderBy: [{ name: "asc" }],
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
