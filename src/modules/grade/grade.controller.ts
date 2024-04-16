import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GradeService } from "./grade.service";
import { Prisma } from "@prisma/client";

@Controller("grade")
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  create(@Body() data: Prisma.GradeCreateInput) {
    return this.gradeService.create(data);
  }

  @Get()
  find() {
    return this.gradeService.find();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gradeService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gradeService.remove(id);
  }
}
