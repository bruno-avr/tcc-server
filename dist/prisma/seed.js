"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const grades_1 = require("./seed-objects/grades");
const subjects_1 = require("./seed-objects/subjects");
const classes_1 = require("./seed-objects/classes");
const teachers_1 = require("./seed-objects/teachers");
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        console.log("Seeding grades...");
        const gradeObjs = await Promise.all(grades_1.default.map(async (data) => await prisma.grade.create({ data })));
        console.log("Seeding classes...");
        const classes = (0, classes_1.default)(gradeObjs);
        const classObjs = await Promise.all(classes.map(async (data) => await prisma.class.create({ data })));
        console.log("Seeding subjects...");
        const subjects = (0, subjects_1.default)(gradeObjs);
        const subjectObjs = await Promise.all(subjects.map(async (data) => await prisma.subject.create({ data })));
        console.log("Seeding teachers...");
        const teachers = await (0, teachers_1.default)(prisma);
        const teacherObjs = await Promise.all(teachers.map(async (data) => await prisma.teacher.create({ data })));
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