import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export type Priorities = {
    id: string;
    priority: number;
    teachers: {
        id: string;
        name: string;
    }[];
}[];
export declare class TeacherService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TeacherCreateInput): Promise<{
        id: string;
        name: string;
        priority: number;
    }>;
    find(): Promise<{
        id: string;
        name: string;
        selectedClasses: {};
        classesPerSubject: any[];
    }[]>;
    getPriorities(): Promise<any[]>;
    savePriorities(data: Priorities): Promise<void>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        priority: number;
    }>;
    update(id: string, data: Prisma.TeacherUpdateInput): Promise<{
        id: string;
        name: string;
        priority: number;
    }>;
    remove(id: string): Promise<void>;
}
