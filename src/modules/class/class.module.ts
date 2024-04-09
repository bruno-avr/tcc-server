import { Module } from "@nestjs/common";
import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";
import { PrismaService } from "../../database/prisma.service";

@Module({
  imports: [],
  controllers: [ClassController],
  providers: [ClassService, PrismaService],
})
export class ClassModule {}
