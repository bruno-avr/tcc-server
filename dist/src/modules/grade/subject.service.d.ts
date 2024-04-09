import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export declare class SubjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SubjectCreateInput): Promise<{
        id: string;
        name: string;
        numWeeklyLessons: number;
    }>;
    find(): Promise<{
        id: string;
        name: string;
        numWeeklyLessons: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        numWeeklyLessons: number;
    }>;
}
