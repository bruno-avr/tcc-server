import { ScheduleService } from "./schedule.service";
import { Prisma } from "@prisma/client";
import { cppBridgeMetaheuristcs } from "src/utils/CPPBridge";
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    generate(metaheuristic: cppBridgeMetaheuristcs, data: any): Promise<any>;
    fixedRecalculation(metaheuristic: cppBridgeMetaheuristcs, data: any): Promise<any>;
    calculateScore(data: any): Promise<any>;
    save(data: any): Promise<{
        id: string;
        schedulesJSON: Prisma.JsonValue;
        metaheuristic: string;
        isFeasible: boolean;
        score: number;
        createdAt: Date;
    }>;
    find(): Promise<{
        metaheuristic: string;
        id: string;
        isFeasible: boolean;
        score: number;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        schedulesJSON: Prisma.JsonValue;
        metaheuristic: string;
        isFeasible: boolean;
        score: number;
        createdAt: Date;
    }>;
}
