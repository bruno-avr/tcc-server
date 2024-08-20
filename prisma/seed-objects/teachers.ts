import { Prisma, PrismaClient } from "@prisma/client";

const defaulTimeSlots = [
  {start: 420, end: 690},   // 420, 470, 520, 590, 640
  {start: 1860, end: 2130}, // 1860, 1910, 1960, 2030, 2080
  {start: 3300, end: 3570}, // 3300, 3350, 3400, 3470, 3520
  {start: 4740, end: 5010}, // 4740, 4790, 4840, 4910, 4960
  {start: 6180, end: 6450}  // 6180, 6230, 6280, 6350, 6400
];

const blankTeacher = (name: string) => ({
  name,
  subjectsPerClass: { create: [] },
  priority: Math.floor(Math.random() * 5),
})

const teachers = [
  blankTeacher("Bruno Alencar"),
  blankTeacher("Sophia Santos"),
  blankTeacher("Gabriel Silva"),
  blankTeacher("Isabella Oliveira"),
  blankTeacher("Lucas Pereira"),
  blankTeacher("Maria Fernandes"),
  blankTeacher("Matheus Costa"),
  blankTeacher("Juliana Souza"),
  blankTeacher("Rafaela Martins"),
  blankTeacher("Pedro Santos"),
  blankTeacher("Ana Clara"),
  blankTeacher("Caio Alves"),
  blankTeacher("Larissa Carvalho"),
  blankTeacher("Thiago Costa"),
  blankTeacher("Camila Freitas"),
  blankTeacher("Rodrigo Lima"),
  blankTeacher("Fernanda Mendes"),
  blankTeacher("Renato Rocha"),
  blankTeacher("Aline Barros"),
  blankTeacher("Henrique Gonçalves"),
  blankTeacher("Bianca Nunes"),
  blankTeacher("Victor Braga"),
  blankTeacher("Patrícia Almeida"),
  blankTeacher("Carlos Magalhães"),
  blankTeacher("André Silva"),
  blankTeacher("Eduarda Rodrigues"),
  blankTeacher("Felipe Farias"),
  blankTeacher("Gabriela Souza"),
  blankTeacher("João Pedro"),
  blankTeacher("Marina Ribeiro"),
  blankTeacher("Samuel Teixeira"),
] as Prisma.TeacherCreateInput[];

function randomTeacher() {
  const randomIndex = Math.floor(Math.random() * teachers.length);
  return teachers[randomIndex];
}

const numLessonsPerTeacher = {}
const WEEKLY_LESSONS = 25;
const CLASSES_PER_SLOT = 5;
let currTeacher = -1;
const obj = {};
function getTeacher(subjectId, numWeeklyLessons) {
  if (!obj[subjectId] || (obj[subjectId].remainingLessons < numWeeklyLessons)) {
    obj[subjectId] = {
      remainingLessons: WEEKLY_LESSONS,
      teacherIndex: ++currTeacher
    }
  }
  if ((numLessonsPerTeacher[obj[subjectId].teacherIndex] || 0) + numWeeklyLessons > WEEKLY_LESSONS) {
    obj[subjectId] = {
      remainingLessons: WEEKLY_LESSONS,
      teacherIndex: ++currTeacher
    }
  }
  if (!numLessonsPerTeacher[obj[subjectId].teacherIndex]) numLessonsPerTeacher[obj[subjectId].teacherIndex] = 0;
  numLessonsPerTeacher[obj[subjectId].teacherIndex] += numWeeklyLessons;
  // console.log(`currTeacher="${currTeacher}", numWeeklyLessons="${numWeeklyLessons}, total=${numLessonsPerTeacher[currTeacher]}`)

  obj[subjectId].remainingLessons -= numWeeklyLessons;
  if (currTeacher >= teachers.length) throw new Error("Not enough teachers");
  return teachers[obj[subjectId].teacherIndex];
}

async function oneTeacherPerSubject(prisma: PrismaClient) {
  const subjectPerGrades = await prisma.subjectPerGrade.findMany({})
  await Promise.all(subjectPerGrades.map(async subjectPerGrade => {
    const classes = await prisma.class.findMany({where: { gradeId: subjectPerGrade.gradeId }})
    classes.forEach(({ id }) => {
      const teacher = getTeacher(subjectPerGrade.subjectId, subjectPerGrade.numWeeklyLessons);
      (teacher.subjectsPerClass.create as Prisma.SubjectPerClassCreateWithoutTeacherInput[]).push({
        class: {
          connect: {
            id,
          },
        },
        subjectPerGrade: {
          connect: {
            id: subjectPerGrade.id,
          },
        },
      })
    })
  }))
}

async function randomTeacherPerSubject(prisma: PrismaClient) {
  const subjectPerGrades = await prisma.subjectPerGrade.findMany({})
  await Promise.all(subjectPerGrades.map(async subjectPerGrade => {
    const classes = await prisma.class.findMany({where: { gradeId: subjectPerGrade.gradeId }})
    classes.forEach(({ id }) => {
      const teacher = randomTeacher();
      (teacher.subjectsPerClass.create as Prisma.SubjectPerClassCreateWithoutTeacherInput[]).push({
        class: {
          connect: {
            id,
          },
        },
        subjectPerGrade: {
          connect: {
            id: subjectPerGrade.id,
          },
        },
      })
    })
  }))
}

function getRandomItems(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const getTimeSlots = (index: number) => {
  const requiredSlots = Math.ceil((numLessonsPerTeacher[index] || 0) / CLASSES_PER_SLOT);
  // console.log(teachers[index].name, numLessonsPerTeacher[index], requiredSlots)
  if (requiredSlots > defaulTimeSlots.length) throw new Error("Not enough time slots");
  const timeSlots = getRandomItems(defaulTimeSlots, requiredSlots);
  
  return {
    create: timeSlots,
  }
}

async function getTeachers(prisma: PrismaClient) {
  // await randomTeacherPerSubject(prisma);
  await oneTeacherPerSubject(prisma);
  return teachers.map((teacher, index) => ({...teacher, timeSlots: getTimeSlots(index)}));
}

export default getTeachers;
