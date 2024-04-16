import { GradeService } from "./grade.service";
import { Prisma } from "@prisma/client";
export declare class GradeController {
    private readonly gradeService;
    constructor(gradeService: GradeService);
    create(data: Prisma.GradeCreateInput): Promise<{
        id: string;
        name: string;
    }>;
    find(): Promise<any[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
    }>;
    update(id: string, data: Prisma.GradeUpdateInput): Promise<{
        id: string;
        name: string;
    }>;
    remove(id: string): Promise<void>;
}
