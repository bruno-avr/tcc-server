import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export declare class SubjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SubjectCreateInput): Promise<{
        id: string;
        name: string;
    }>;
    find(): Promise<({
        numLessonsPerGrade: ({
            grade: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            subjectId: string;
            gradeId: string;
            numWeeklyLessons: number;
        })[];
    } & {
        id: string;
        name: string;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
    }>;
    update(id: string, data: Prisma.SubjectUpdateInput): Promise<{
        id: string;
        name: string;
    }>;
}
