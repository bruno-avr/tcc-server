import { ScheduleService } from "./schedule.service";
import { Prisma } from "@prisma/client";
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    generate(metaheuristic: string, data: any): Promise<any>;
    fixedRecalculation(metaheuristic: string, data: any): Promise<any>;
    save(data: any): Promise<{
        id: string;
        schedulesJSON: Prisma.JsonValue;
        hasManualChange: boolean;
        metaheuristic: string;
        isFeasible: boolean;
        score: number;
        createdAt: Date;
    }>;
    find(): Promise<{
        id: string;
        hasManualChange: boolean;
        metaheuristic: string;
        isFeasible: boolean;
        score: number;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        schedulesJSON: Prisma.JsonValue;
        hasManualChange: boolean;
        metaheuristic: string;
        isFeasible: boolean;
        score: number;
        createdAt: Date;
    }>;
}
