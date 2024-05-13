import { Prisma } from "@prisma/client";

type Grades = {
  id: string;
  name: string;
}[];

type DirtySubject = {
  name: string;
  subjectsPerGrade: { name: string; numWeeklyLessons: number }[];
};

const subjects = [
  {
    name: "Língua Portuguesa",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 5 },
      { name: "7º ano", numWeeklyLessons: 5 },
      { name: "8º ano", numWeeklyLessons: 5 },
      { name: "9º ano", numWeeklyLessons: 5 },
    ],
  },
  {
    name: "Matemática",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 5 },
      { name: "7º ano", numWeeklyLessons: 5 },
      { name: "8º ano", numWeeklyLessons: 5 },
      { name: "9º ano", numWeeklyLessons: 5 },
    ],
  },
  {
    name: "História",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 2 },
      { name: "7º ano", numWeeklyLessons: 2 },
      { name: "8º ano", numWeeklyLessons: 2 },
      { name: "9º ano", numWeeklyLessons: 2 },
    ],
  },
  {
    name: "Geografia",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 2 },
      { name: "7º ano", numWeeklyLessons: 2 },
      { name: "8º ano", numWeeklyLessons: 2 },
      { name: "9º ano", numWeeklyLessons: 2 },
    ],
  },
  {
    name: "Ciências",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 2 },
      { name: "7º ano", numWeeklyLessons: 2 },
      { name: "8º ano", numWeeklyLessons: 2 },
      { name: "9º ano", numWeeklyLessons: 2 },
    ],
  },
  {
    name: "Educação Física",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 2 },
      { name: "7º ano", numWeeklyLessons: 2 },
      { name: "8º ano", numWeeklyLessons: 2 },
      { name: "9º ano", numWeeklyLessons: 2 },
    ],
  },
  {
    name: "Arte",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 2 },
      { name: "7º ano", numWeeklyLessons: 2 },
      { name: "8º ano", numWeeklyLessons: 2 },
      { name: "9º ano", numWeeklyLessons: 2 },
    ],
  },
  {
    name: "Ensino Religioso",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 1 },
      { name: "7º ano", numWeeklyLessons: 1 },
      { name: "8º ano", numWeeklyLessons: 1 },
      { name: "9º ano", numWeeklyLessons: 1 },
    ],
  },
  {
    name: "Inglês",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 2 },
      { name: "7º ano", numWeeklyLessons: 2 },
      { name: "8º ano", numWeeklyLessons: 2 },
      { name: "9º ano", numWeeklyLessons: 2 },
    ],
  },
  {
    name: "Espanhol",
    subjectsPerGrade: [
      { name: "6º ano", numWeeklyLessons: 2 },
      { name: "7º ano", numWeeklyLessons: 2 },
      { name: "8º ano", numWeeklyLessons: 2 },
      { name: "9º ano", numWeeklyLessons: 2 },
    ],
  },
] as DirtySubject[];

let map: {};

function formatSubjects(dirtySubjects: DirtySubject[]) {
  const subjects = dirtySubjects.map((dirtySubject) => ({
    name: dirtySubject.name,
    subjectsPerGrade: {
      create: dirtySubject.subjectsPerGrade.map((subjectsPerGrade) => ({
        numWeeklyLessons: subjectsPerGrade.numWeeklyLessons,
        grade: { connect: { id: map[subjectsPerGrade.name] } },
      })),
    },
  })) as Prisma.SubjectCreateInput[];
  return subjects;
}

function getSubjects(grades: Grades) {
  map = {};
  grades.forEach((grade) => {
    map[grade.name] = grade.id;
  });

  return formatSubjects(subjects);
}

export default getSubjects;
