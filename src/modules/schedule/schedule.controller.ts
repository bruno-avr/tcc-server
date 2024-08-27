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
import { cppBridgeMetaheuristcs } from "src/utils/CPPBridge";

@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post("/generate/:metaheuristic")
  generate(
    @Param("metaheuristic") metaheuristic: cppBridgeMetaheuristcs,
    @Body() data
  ) {
    return this.scheduleService.generate("generate", { metaheuristic, executionSpeed: data.executionSpeed });
  }

  @Post("/fixed-recalculation/:metaheuristic")
  fixedRecalculation(
    @Param("metaheuristic") metaheuristic: cppBridgeMetaheuristcs,
    @Body() data
  ) {
    return this.scheduleService.generate("fixed_recalculation", {
      metaheuristic,
      defaultSchedule: data,
    });
  }

  @Post("/calculate-score")
  calculateScore(@Body() data) {
    return this.scheduleService.generate("calculate_score", {
      defaultSchedule: data,
    });
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
