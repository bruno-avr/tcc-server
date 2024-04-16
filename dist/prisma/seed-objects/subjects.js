"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subjects = [
    {
        name: "Língua Portuguesa",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 5 },
            { name: "7º ano", numWeeklyLessons: 5 },
            { name: "8º ano", numWeeklyLessons: 5 },
            { name: "9º ano", numWeeklyLessons: 5 },
        ],
    },
    {
        name: "Matemática",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 5 },
            { name: "7º ano", numWeeklyLessons: 5 },
            { name: "8º ano", numWeeklyLessons: 5 },
            { name: "9º ano", numWeeklyLessons: 5 },
        ],
    },
    {
        name: "História",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 2 },
            { name: "7º ano", numWeeklyLessons: 2 },
            { name: "8º ano", numWeeklyLessons: 2 },
            { name: "9º ano", numWeeklyLessons: 2 },
        ],
    },
    {
        name: "Geografia",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 2 },
            { name: "7º ano", numWeeklyLessons: 2 },
            { name: "8º ano", numWeeklyLessons: 2 },
            { name: "9º ano", numWeeklyLessons: 2 },
        ],
    },
    {
        name: "Ciências",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 2 },
            { name: "7º ano", numWeeklyLessons: 2 },
            { name: "8º ano", numWeeklyLessons: 2 },
            { name: "9º ano", numWeeklyLessons: 2 },
        ],
    },
    {
        name: "Educação Física",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 2 },
            { name: "7º ano", numWeeklyLessons: 2 },
            { name: "8º ano", numWeeklyLessons: 2 },
            { name: "9º ano", numWeeklyLessons: 2 },
        ],
    },
    {
        name: "Arte",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 2 },
            { name: "7º ano", numWeeklyLessons: 2 },
            { name: "8º ano", numWeeklyLessons: 2 },
            { name: "9º ano", numWeeklyLessons: 2 },
        ],
    },
    {
        name: "Ensino Religioso",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 1 },
            { name: "7º ano", numWeeklyLessons: 1 },
            { name: "8º ano", numWeeklyLessons: 1 },
            { name: "9º ano", numWeeklyLessons: 1 },
        ],
    },
    {
        name: "Inglês",
        numLessonsPerGrade: [
            { name: "6º ano", numWeeklyLessons: 2 },
            { name: "7º ano", numWeeklyLessons: 2 },
            { name: "8º ano", numWeeklyLessons: 2 },
            { name: "9º ano", numWeeklyLessons: 2 },
        ],
    },
    {
        name: "Espanhol",
        numLessonsPerGrade: [
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
        numLessonsPerGrade: {
            create: dirtySubject.numLessonsPerGrade.map((numLessonsPerGrade) => ({
                numWeeklyLessons: numLessonsPerGrade.numWeeklyLessons,
                grade: { connect: { id: map[numLessonsPerGrade.name] } },
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