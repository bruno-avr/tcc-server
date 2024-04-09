import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ClassService } from "./class.service";
import { Prisma } from "@prisma/client";

@Controller("class")
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() data: Prisma.ClassCreateInput) {
    return this.classService.create(data);
  }

  @Get()
  find() {
    return this.classService.find();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.classService.findOne(id);
  }
}
