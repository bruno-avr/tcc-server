import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SubjectController } from "./subject.controller";
import { PrismaService } from "../../database/prisma.service";

@Module({
  imports: [],
  controllers: [SubjectController],
  providers: [SubjectService, PrismaService],
})
export class SubjectModule {}
