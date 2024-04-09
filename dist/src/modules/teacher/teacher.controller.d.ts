import { TeacherService } from "./teacher.service";
import { Prisma } from "@prisma/client";
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    create(data: Prisma.TeacherCreateInput): Promise<{
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
