"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
];
let map;
function formatSubjects(dirtySubjects) {
    const subjects = dirtySubjects.map((dirtySubject) => ({
        name: dirtySubject.name,
        subjectsPerGrade: {
            create: dirtySubject.subjectsPerGrade.map((subjectsPerGrade) => ({
                numWeeklyLessons: subjectsPerGrade.numWeeklyLessons,
                grade: { connect: { id: map[subjectsPerGrade.name] } },
            })),
        },
    }));
    return subjects;
}
function getSubjects(grades) {
    map = {};
    grades.forEach((grade) => {
        map[grade.name] = grade.id;
    });
    return formatSubjects(subjects);
}
exports.default = getSubjects;
//# sourceMappingURL=subjects.js.map