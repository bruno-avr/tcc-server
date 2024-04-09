import { PrismaClient } from "@prisma/client";
import teachers from "./seed-objects/teachers";
import subjects from "./seed-objects/subjects";
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Seeding users...");
    const teacherObjs = await Promise.all(
      teachers.map(async (data) => await prisma.teacher.create({ data }))
    );

    console.log("Seeding subjects...");
    const subjectObjs = await Promise.all(
      subjects.map(async (data) => await prisma.subject.create({ data }))
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
