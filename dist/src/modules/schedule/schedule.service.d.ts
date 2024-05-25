import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export declare class ScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    generate(metaheuristic: string, defaultSchedule?: any): Promise<any>;
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
