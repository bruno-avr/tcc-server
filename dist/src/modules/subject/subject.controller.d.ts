import { SubjectService } from "./subject.service";
import { Prisma } from "@prisma/client";
export declare class SubjectController {
    private readonly subjectService;
    constructor(subjectService: SubjectService);
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
}
