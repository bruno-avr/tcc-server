import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export declare class ClassService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ClassCreateInput): Promise<{
        id: string;
        section: string;
        gradeId: string;
        availableTimeSlots: number[];
    }>;
    find(): Promise<({
        grade: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        section: string;
        gradeId: string;
        availableTimeSlots: number[];
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        section: string;
        gradeId: string;
        availableTimeSlots: number[];
    }>;
}
