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

const defaulTimeSlots = [
  420, 470, 520, 590, 640, 1860, 1910, 1960, 2030, 2080, 3300, 3350, 3400, 3470,
  3520, 4740, 4790, 4840, 4910, 4960, 6180, 6230, 6280, 6350, 6400,
];

const classes = [
  { grade: "6º ano", section: "A" },
  { grade: "6º ano", section: "B" },
  { grade: "7º ano", section: "A" },
  { grade: "7º ano", section: "B" },
  { grade: "8º ano", section: "A" },
  { grade: "9º ano", section: "A" },
] as DirtyClass[];

function formatClasses(dirtyClasses: DirtyClass[]) {
  const classes = dirtyClasses.map((dirtySubject) => ({
    section: dirtySubject.section,
    grade: { connect: { id: map[dirtySubject.grade] } },
    availableTimeSlots: defaulTimeSlots,
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
