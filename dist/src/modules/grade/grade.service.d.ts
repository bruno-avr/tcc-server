import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export declare class GradeService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.GradeCreateInput): Promise<{
        id: string;
        name: string;
    }>;
    find(): Promise<any[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
    }>;
    remove(id: string): Promise<void>;
}
