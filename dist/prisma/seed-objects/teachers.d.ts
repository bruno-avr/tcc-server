import { Prisma, PrismaClient } from "@prisma/client";
declare function getTeachers(prisma: PrismaClient): Promise<Prisma.TeacherCreateInput[]>;
export default getTeachers;
