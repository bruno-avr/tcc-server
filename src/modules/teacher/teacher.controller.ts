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

  @Get('/priorities')
  getPriorities() {
    return this.teacherService.getPriorities();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: Prisma.TeacherUpdateInput) {
    return this.teacherService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teacherService.remove(id);
  }
}
