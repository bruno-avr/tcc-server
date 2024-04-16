import { Prisma } from "@prisma/client";

type Grades = {
  id: string;
  name: string;
}[];

type DirtyClass = {
  grade: string;
  section: string;
};

let map: {};

const classes = [
  { grade: "6º ano", section: "A" },
  { grade: "6º ano", section: "B" },
  { grade: "7º ano", section: "A" },
  { grade: "6º ano", section: "B" },
  { grade: "8º ano", section: "A" },
  { grade: "9º ano", section: "A" },
] as DirtyClass[];

function formatClasses(dirtyClasses: DirtyClass[]) {
  const classes = dirtyClasses.map((dirtySubject) => ({
    section: dirtySubject.section,
    grade: { connect: { id: map[dirtySubject.grade] } },
  })) as Prisma.ClassCreateInput[];
  return classes;
}

function getClasses(grades: Grades) {
  map = {};
  grades.forEach((grade) => {
    map[grade.name] = grade.id;
  });

  return formatClasses(classes);
}

export default getClasses;
