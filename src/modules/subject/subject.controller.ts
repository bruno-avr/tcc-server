import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { Prisma } from "@prisma/client";

@Controller("subject")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() data: Prisma.SubjectCreateInput) {
    return this.subjectService.create(data);
  }

  @Get()
  find() {
    return this.subjectService.find();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subjectService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: Prisma.SubjectUpdateInput) {
    return this.subjectService.update(id, data);
  }
}
