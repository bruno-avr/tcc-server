"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let map;
const classes = [
    { grade: "6º ano", section: "A" },
    { grade: "6º ano", section: "B" },
    { grade: "7º ano", section: "A" },
    { grade: "6º ano", section: "B" },
    { grade: "8º ano", section: "A" },
    { grade: "9º ano", section: "A" },
];
function formatClasses(dirtyClasses) {
    const classes = dirtyClasses.map((dirtySubject) => ({
        section: dirtySubject.section,
        grade: { connect: { id: map[dirtySubject.grade] } },
    }));
    return classes;
}
function getClasses(grades) {
    map = {};
    grades.forEach((grade) => {
        map[grade.name] = grade.id;
    });
    return formatClasses(classes);
}
exports.default = getClasses;
//# sourceMappingURL=classes.js.map