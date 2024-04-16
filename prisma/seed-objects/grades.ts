import { Prisma } from "@prisma/client";

const grades = [
  { name: "6º ano" },
  { name: "7º ano" },
  { name: "8º ano" },
  { name: "9º ano" },
] as Prisma.GradeCreateInput[];

export default grades;
