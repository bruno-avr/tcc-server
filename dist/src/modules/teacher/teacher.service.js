"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let TeacherService = class TeacherService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const nameExists = await this.prisma.teacher.findFirst({
            where: { name: data.name },
        });
        if (nameExists) {
            throw new Error("Teacher name already registered");
        }
        await Promise.all((data?.subjectsPerClass?.create || []).map(async (unique) => {
            const alreadyHasTeacher = await this.prisma.subjectPerClass.findFirst({
                where: {
                    classId: unique.class.connect.id,
                    subjectPerGradeId: unique.subjectPerGrade.connect.id
                },
                include: {
                    class: true,
                    teacher: true,
                    subjectPerGrade: {
                        include: {
                            subject: true,
                            grade: true,
                        }
                    }
                }
            });
            if (alreadyHasTeacher) {
                let errMsg = `Já existe um professor (${alreadyHasTeacher.teacher.name}) `;
                errMsg += `associado à disciplina ${alreadyHasTeacher.subjectPerGrade.subject.name} `;
                errMsg += `na turma ${alreadyHasTeacher.subjectPerGrade.grade.name} - `;
                errMsg += `${alreadyHasTeacher.class.section}.`;
                throw new Error(errMsg);
            }
        }));
        const teacher = await this.prisma.teacher.create({
            data: {
                ...data,
            },
        });
        return teacher;
    }
    async find() {
        const teachers = await this.prisma.teacher.findMany({
            orderBy: [{ name: "asc" }],
            include: {
                subjectsPerClass: {
                    include: {
                        class: {
                            select: {
                                id: true,
                                section: true,
                            },
                        },
                        subjectPerGrade: {
                            select: {
                                id: true,
                                grade: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                                subject: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
                timeSlots: true,
            },
        });
        const processedTeachers = teachers.map((teacher) => {
            const selectedClasses = {};
            const classesPerSubjectObj = {};
            teacher.subjectsPerClass.forEach((subjectPerClass) => {
                const className = `${subjectPerClass.subjectPerGrade.grade.name} - ${subjectPerClass.class.section}`;
                const subjectName = subjectPerClass.subjectPerGrade.subject.name;
                if (!(subjectName in classesPerSubjectObj))
                    classesPerSubjectObj[subjectName] = [];
                classesPerSubjectObj[subjectName].push(className);
                const subjectId = subjectPerClass.subjectPerGrade.subject.id;
                if (!(subjectId in selectedClasses))
                    selectedClasses[subjectId] = [];
                selectedClasses[subjectId].push({
                    id: subjectPerClass.class.id,
                    name: className,
                    subjectPerGradeId: subjectPerClass.subjectPerGradeId,
                });
            });
            const classesPerSubject = [];
            for (const key in classesPerSubjectObj) {
                classesPerSubject.push({
                    name: key,
                    classes: classesPerSubjectObj[key],
                });
            }
            return {
                id: teacher.id,
                name: teacher.name,
                selectedClasses,
                classesPerSubject,
                timeSlots: teacher.timeSlots
            };
        });
        return processedTeachers;
    }
    async getPriorities() {
        const teachers = await this.prisma.teacher.findMany({
            orderBy: [{ name: "asc" }],
        });
        const teacherMap = {};
        teachers.forEach((teacher) => {
            const processedTeacher = {
                id: teacher.id,
                name: teacher.name,
            };
            if (!teacherMap[teacher.priority])
                teacherMap[teacher.priority] = [];
            teacherMap[teacher.priority].push(processedTeacher);
        });
        const priorities = Object.keys(teacherMap).map(Number);
        const minPriority = 0;
        const maxPriority = Math.max(...priorities);
        const result = [];
        for (let i = minPriority; i <= maxPriority; i++) {
            result.push({
                id: String(i),
                priority: i,
                teachers: teacherMap[i] || [],
            });
        }
        return result;
    }
    async savePriorities(data) {
        const updatedTeachers = data.flatMap(column => column.teachers.map(teacher => ({
            id: teacher.id,
            newPriority: column.priority
        })));
        const updatePromises = updatedTeachers.map(({ id, newPriority }) => this.prisma.teacher.update({
            where: { id },
            data: { priority: newPriority }
        }));
        await Promise.all(updatePromises);
    }
    async findOne(id) {
        const teacher = await this.prisma.teacher.findFirst({
            where: { id },
        });
        if (!teacher) {
            throw new Error("Teacher not found");
        }
        return teacher;
    }
    async update(id, data) {
        const teacherExists = await this.prisma.teacher.findFirst({
            where: { name: String(data.name) },
        });
        if (teacherExists && teacherExists.id !== id)
            throw new Error("Já existe um professor registrado com esse nome.");
        await Promise.all((data?.subjectsPerClass?.create || []).map(async (unique) => {
            const alreadyHasTeacher = await this.prisma.subjectPerClass.findFirst({
                where: {
                    classId: unique.class.connect.id,
                    subjectPerGradeId: unique.subjectPerGrade.connect.id,
                    teacherId: { not: id }
                },
                include: {
                    class: true,
                    teacher: true,
                    subjectPerGrade: {
                        include: {
                            subject: true,
                            grade: true,
                        }
                    }
                }
            });
            if (alreadyHasTeacher) {
                let errMsg = `Dois professores não podem estar associados à mesma disciplina em uma turma. `;
                errMsg += `O professor ${alreadyHasTeacher.teacher.name} já está associado `;
                errMsg += `à disciplina ${alreadyHasTeacher.subjectPerGrade.subject.name} `;
                errMsg += `na turma ${alreadyHasTeacher.subjectPerGrade.grade.name} - `;
                errMsg += `${alreadyHasTeacher.class.section}.`;
                throw new Error(errMsg);
            }
        }));
        const existants = [];
        const news = [];
        await Promise.all(data.subjectsPerClass.create.map(async (el) => {
            const found = await this.prisma.subjectPerClass.findFirst({
                where: {
                    teacherId: id,
                    classId: el.class.connect.id,
                    subjectPerGradeId: el.subjectPerGrade.connect.id,
                },
            });
            if (found) {
                existants.push(found.id);
            }
            else {
                news.push(el);
            }
        }));
        data.subjectsPerClass.create = news;
        await this.prisma.subjectPerClass.deleteMany({
            where: { teacherId: id, id: { notIn: existants } },
        });
        const teacher = await this.prisma.teacher.update({
            where: { id },
            data: {
                ...data,
            },
        });
        if (!teacher) {
            throw new Error("Professor não encontrado");
        }
        return teacher;
    }
    async remove(id) {
        await this.prisma.$transaction(async (prisma) => {
            await prisma.subjectPerClass.deleteMany({
                where: { teacherId: id },
            });
            await prisma.teacher.delete({
                where: { id },
            });
        });
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map