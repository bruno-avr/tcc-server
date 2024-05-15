import { ScheduleService } from "./schedule.service";
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    generate(): Promise<string>;
}
