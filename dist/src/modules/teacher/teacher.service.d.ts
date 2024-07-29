import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export declare class TeacherService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TeacherCreateInput): Promise<{
        id: string;
        name: string;
    }>;
    find(): Promise<{
        id: string;
        name: string;
        selectedClasses: {};
        classesPerSubject: any[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
    }>;
    update(id: string, data: Prisma.TeacherUpdateInput): Promise<{
        id: string;
        name: string;
    }>;
    remove(id: string): Promise<void>;
}
