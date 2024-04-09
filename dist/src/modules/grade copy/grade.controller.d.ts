import { GradeService } from "./grade.service";
import { Prisma } from "@prisma/client";
export declare class GradeController {
    private readonly gradeService;
    constructor(gradeService: GradeService);
    create(data: Prisma.GradeCreateInput): Promise<{
        id: string;
        name: string;
    }>;
    find(): Promise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
    }>;
}
