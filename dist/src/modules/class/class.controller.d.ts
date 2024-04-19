import { ClassService } from "./class.service";
import { Prisma } from "@prisma/client";
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
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
    update(id: string, data: Prisma.ClassUpdateInput): Promise<{
        id: string;
        section: string;
        gradeId: string;
        availableTimeSlots: number[];
    }>;
    remove(id: string): Promise<void>;
}
