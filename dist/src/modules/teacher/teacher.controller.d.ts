import { Priorities, TeacherService } from "./teacher.service";
import { Prisma } from "@prisma/client";
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
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
        timeSlots: {
            id: string;
            start: number;
            end: number;
            teacherId: string;
        }[];
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
