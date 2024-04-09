import { ClassService } from "./class.service";
import { Prisma } from "@prisma/client";
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    create(data: Prisma.ClassCreateInput): Promise<{
        id: string;
        name: string;
        gradeId: string;
        availableTimeSlots: number[];
    }>;
    find(): Promise<{
        id: string;
        name: string;
        gradeId: string;
        availableTimeSlots: number[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        gradeId: string;
        availableTimeSlots: number[];
    }>;
}
