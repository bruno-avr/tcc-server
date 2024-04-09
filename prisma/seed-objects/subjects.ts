import { Prisma } from "@prisma/client";

const subjects = [
  { name: "Matemática", numWeeklyLessons: 5 },
  { name: "Português", numWeeklyLessons: 4 },
  { name: "Ciências", numWeeklyLessons: 3 },
  { name: "História", numWeeklyLessons: 3 },
  { name: "Geografia", numWeeklyLessons: 3 },
  { name: "Inglês", numWeeklyLessons: 4 },
  { name: "Educação Física", numWeeklyLessons: 2 },
  { name: "Arte", numWeeklyLessons: 2 },
  { name: "Biologia", numWeeklyLessons: 3 },
  { name: "Física", numWeeklyLessons: 4 },
] as Prisma.SubjectCreateInput[];

export default subjects;
