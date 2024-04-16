import { Prisma } from "@prisma/client";
type Grades = {
    id: string;
    name: string;
}[];
declare function getSubjects(grades: Grades): Prisma.SubjectCreateInput[];
export default getSubjects;
