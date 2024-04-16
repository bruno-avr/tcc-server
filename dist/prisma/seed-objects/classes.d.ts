import { Prisma } from "@prisma/client";
type Grades = {
    id: string;
    name: string;
}[];
declare function getClasses(grades: Grades): Prisma.ClassCreateInput[];
export default getClasses;
