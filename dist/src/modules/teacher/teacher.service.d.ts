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
        data: {
            id: string;
            name: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
    }>;
}
