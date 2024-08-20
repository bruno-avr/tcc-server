import { Prisma, PrismaClient } from "@prisma/client";
declare function getTeachers(prisma: PrismaClient): Promise<{
    timeSlots: {
        create: any;
    };
    id?: string;
    name: string;
    priority?: number;
    subjectsPerClass?: Prisma.SubjectPerClassCreateNestedManyWithoutTeacherInput;
}[]>;
export default getTeachers;
