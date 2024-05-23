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

  @Post("/generate")
  generate() {
    return this.scheduleService.generate(false);
  }

  @Post("/fixed-recalculation")
  fixedRecalculation(@Body() data) {
    return this.scheduleService.generate(data);
  }
}
