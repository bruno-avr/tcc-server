"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const teachers_1 = require("./seed-objects/teachers");
const subjects_1 = require("./seed-objects/subjects");
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        console.log("Seeding users...");
        const teacherObjs = await Promise.all(teachers_1.default.map(async (data) => await prisma.teacher.create({ data })));
        console.log("Seeding subjects...");
        const subjectObjs = await Promise.all(subjects_1.default.map(async (data) => await prisma.subject.create({ data })));
    }
    catch (error) {
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
//# sourceMappingURL=seed.js.map