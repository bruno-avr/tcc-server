import { Module } from "@nestjs/common";
import { GradeService } from "./grade.service";
import { GradeController } from "./grade.controller";
import { PrismaService } from "../../database/prisma.service";

@Module({
  imports: [],
  controllers: [GradeController],
  providers: [GradeService, PrismaService],
})
export class GradeModule {}
