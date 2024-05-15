import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import cppBridge from "src/utils/cppBridge";

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async generate() {
    let teachers = await this.prisma.teacher.findMany({
      include: {
        subjectsPerClass: {
          include: {
            subjectPerGrade: true,
          },
        },
      },
    });
    teachers = teachers.filter((teacher) => teacher.subjectsPerClass.length);

    const res = await cppBridge("7 8");

    return res;
  }
}
