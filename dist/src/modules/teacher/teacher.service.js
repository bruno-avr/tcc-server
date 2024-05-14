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
            };
        });
        return processedTeachers;
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
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map