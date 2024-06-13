import { PrismaClient } from "@prisma/client";
import grades from "./seed-objects/grades";
import getSubjects from "./seed-objects/subjects";
import getClasses from "./seed-objects/classes";
import getTeachers from "./seed-objects/teachers";
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Seeding grades...");
    const gradeObjs = await Promise.all(
      grades.map(async (data) => await prisma.grade.create({ data }))
    );

    console.log("Seeding classes...");
    const classes = getClasses(gradeObjs);
    const classObjs = await Promise.all(
      classes.map(async (data) => await prisma.class.create({ data }))
    );

    console.log("Seeding subjects...");
    const subjects = getSubjects(gradeObjs);
    const subjectObjs = await Promise.all(
      subjects.map(async (data) => await prisma.subject.create({ data }))
    );

    console.log("Seeding teachers...");
    const teachers = await getTeachers(prisma);
    const teacherObjs = await Promise.all(
      teachers.map(async (data) => await prisma.teacher.create({ data }))
    );
  } catch (error) {
    console.log("Aconteceu um erro: " + error.message);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
