import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { Prisma } from "@prisma/client";

@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() data: Prisma.TeacherCreateInput) {
    return this.teacherService.create(data);
  }

  @Get()
  find() {
    return this.teacherService.find();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.teacherService.findOne(id);
  }
}
