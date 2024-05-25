import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { Prisma } from "@prisma/client";

@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post("/generate/:metaheuristic")
  generate(@Param("metaheuristic") metaheuristic: string, @Body() data) {
    return this.scheduleService.generate(metaheuristic, false);
  }

  @Post("/fixed-recalculation/:metaheuristic")
  fixedRecalculation(
    @Param("metaheuristic") metaheuristic: string,
    @Body() data
  ) {
    return this.scheduleService.generate(metaheuristic, data);
  }

  @Post("/save")
  save(@Body() data) {
    return this.scheduleService.save(data);
  }

  @Get()
  find() {
    return this.scheduleService.find();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.scheduleService.findOne(id);
  }
}
