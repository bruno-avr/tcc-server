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
exports.GradeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let GradeService = class GradeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (!data.name)
            throw new Error('O campo "nome" é obrigatório.');
        const nameExists = await this.prisma.grade.findFirst({
            where: { name: data.name },
        });
        if (nameExists)
            throw new Error("Já existe uma série registrada com esse nome.");
        const grade = await this.prisma.grade.create({
            data: {
                ...data,
            },
        });
        return grade;
    }
    async find() {
        const dirtyGrades = await this.prisma.grade.findMany({
            orderBy: [{ name: "asc" }],
            include: {
                subjectsPerGrade: {
                    include: {
                        subject: true,
                    },
                    orderBy: [{ subject: { name: "asc" } }],
                },
                classes: {
                    orderBy: [{ section: "asc" }],
                },
            },
        });
        const grades = dirtyGrades.map((dirtyGrade) => {
            const grade = dirtyGrade;
            grade.subjects = grade.subjectsPerGrade.map((subjectPerGrade) => ({
                name: subjectPerGrade.subject.name,
                numWeeklyLessons: subjectPerGrade.numWeeklyLessons,
            }));
            delete grade.subjectsPerGrade;
            return grade;
        });
        return grades;
    }
    async findOne(id) {
        const grade = await this.prisma.grade.findFirst({
            where: { id },
        });
        if (!grade) {
            throw new Error("Série não encontrada");
        }
        return grade;
    }
    async getNames() {
        const grades = await this.prisma.grade.findMany({
            orderBy: [{ name: "asc" }],
        });
        return grades;
    }
    async update(id, data) {
        if (!data.name)
            throw new Error('O campo "nome" é obrigatório.');
        const nameExists = await this.prisma.grade.findFirst({
            where: { name: String(data.name) },
        });
        if (nameExists)
            throw new Error("Já existe uma série registrada com esse nome.");
        const grade = await this.prisma.grade.update({
            where: { id },
            data: { name: data.name },
        });
        if (!grade) {
            throw new Error("Série não encontrada");
        }
        return grade;
    }
    async remove(id) {
        const hasSubject = await this.prisma.subject.findFirst({
            where: { numLessonsPerGrade: { some: { gradeId: id } } },
        });
        if (hasSubject)
            throw new Error("Existem disciplinas que dependem dessa série.");
        const hasClass = await this.prisma.class.findFirst({
            where: { gradeId: id },
        });
        if (hasClass)
            throw new Error("Existem turmas que dependem dessa série.");
        await this.prisma.grade.delete({ where: { id } });
    }
};
exports.GradeService = GradeService;
exports.GradeService = GradeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GradeService);
//# sourceMappingURL=grade.service.js.map