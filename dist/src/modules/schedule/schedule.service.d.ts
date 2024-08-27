import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { cppBridgeMetaheuristcs, cppBridgeTypes, cppBridgeExecutionSpeed } from "src/utils/CPPBridge";
export declare class ScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    generate(type: cppBridgeTypes, data: {
        metaheuristic?: cppBridgeMetaheuristcs;
        executionSpeed?: cppBridgeExecutionSpeed;
        defaultSchedule?: any;
    }): Promise<any>;
    save(data: any): Promise<{
        id: string;
        schedulesJSON: Prisma.JsonValue;
        metaheuristic: string;
        isFeasible: boolean;
        score: number;
        createdAt: Date;
    }>;
    find(): Promise<{
        id: string;
        metaheuristic: string;
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
