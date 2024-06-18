import { Prisma, PrismaClient } from "@prisma/client";

const teachers = [
  { name: "Bruno Alencar", subjectsPerClass: { create: [] } },
  { name: "Sophia Santos", subjectsPerClass: { create: [] } },
  { name: "Gabriel Silva", subjectsPerClass: { create: [] } },
  { name: "Isabella Oliveira", subjectsPerClass: { create: [] } },
  { name: "Lucas Pereira", subjectsPerClass: { create: [] } },
  { name: "Maria Fernandes", subjectsPerClass: { create: [] } },
  { name: "Matheus Costa", subjectsPerClass: { create: [] } },
  { name: "Juliana Souza", subjectsPerClass: { create: [] } },
  { name: "Rafaela Martins", subjectsPerClass: { create: [] } },
  { name: "Pedro Santos", subjectsPerClass: { create: [] } },
  { name: "Ana Clara", subjectsPerClass: { create: [] } },
  { name: "Caio Alves", subjectsPerClass: { create: [] } },
  { name: "Larissa Carvalho", subjectsPerClass: { create: [] } },
  { name: "Thiago Costa", subjectsPerClass: { create: [] } },
  { name: "Camila Freitas", subjectsPerClass: { create: [] } },
  { name: "Rodrigo Lima", subjectsPerClass: { create: [] } },
  { name: "Fernanda Mendes", subjectsPerClass: { create: [] } },
  { name: "Renato Rocha", subjectsPerClass: { create: [] } },
  { name: "Aline Barros", subjectsPerClass: { create: [] } },
  { name: "Henrique Gonçalves", subjectsPerClass: { create: [] } },
  { name: "Bianca Nunes", subjectsPerClass: { create: [] } },
  { name: "Victor Braga", subjectsPerClass: { create: [] } },
  { name: "Patrícia Almeida", subjectsPerClass: { create: [] } },
  { name: "Carlos Magalhães", subjectsPerClass: { create: [] } },
  { name: "André Silva", subjectsPerClass: { create: [] } },
  { name: "Eduarda Rodrigues", subjectsPerClass: { create: [] } },
  { name: "Felipe Farias", subjectsPerClass: { create: [] } },
  { name: "Gabriela Souza", subjectsPerClass: { create: [] } },
  { name: "João Pedro", subjectsPerClass: { create: [] } },
  { name: "Marina Ribeiro", subjectsPerClass: { create: [] } },
  { name: "Samuel Teixeira", subjectsPerClass: { create: [] } }
] as Prisma.TeacherCreateInput[];

function randomTeacher() {
  const randomIndex = Math.floor(Math.random() * teachers.length);
  return teachers[randomIndex];
}
const WEEKLY_LESSONS = 25;
let currTeacher = 0;
const obj = {};
function getTeacher(subjectId, numWeeklyLessons) {
  if (!obj[subjectId] || obj[subjectId].remainingLessons < numWeeklyLessons) {
    obj[subjectId] = {
      remainingLessons: WEEKLY_LESSONS,
      teacherIndex: currTeacher++
    }
  }
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

async function getTeachers(prisma: PrismaClient) {
  // await randomTeacherPerSubject(prisma);
  await oneTeacherPerSubject(prisma);
  return teachers;
}

export default getTeachers;
