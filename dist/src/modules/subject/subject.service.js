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
exports.SubjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let SubjectService = class SubjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const nameExists = await this.prisma.subject.findFirst({
            where: { name: data.name },
        });
        if (nameExists) {
            throw new Error("Já existe uma disciplina registrada com esse nome.");
        }
        const subject = await this.prisma.subject.create({
            data: {
                ...data,
            },
        });
        return subject;
    }
    async find() {
        const subjects = await this.prisma.subject.findMany({
            orderBy: [{ name: "asc" }],
            include: {
                numLessonsPerGrade: {
                    orderBy: [{ grade: { name: "asc" } }],
                    include: {
                        grade: true,
                    },
                },
            },
        });
        return subjects;
    }
    async findOne(id) {
        const subject = await this.prisma.subject.findFirst({
            where: { id },
        });
        if (!subject) {
            throw new Error("Subject not found");
        }
        return subject;
    }
    async update(id, data) {
        const subjectExists = await this.prisma.subject.findFirst({
            where: { name: String(data.name) },
        });
        if (subjectExists && subjectExists.id !== id)
            throw new Error("Já existe uma disciplina registrada com esse nome.");
        const existants = [];
        const news = [];
        await Promise.all(data.numLessonsPerGrade.create.map(async (el) => {
            const found = await this.prisma.numLessonsPerGrade.findFirst({
                where: {
                    subjectId: id,
                    gradeId: el.grade.connect.id,
                },
            });
            if (found) {
                const res = await this.prisma.numLessonsPerGrade.update({
                    where: {
                        id: found.id,
                    },
                    data: {
                        numWeeklyLessons: el.numWeeklyLessons,
                    },
                });
                existants.push(found.id);
            }
            else {
                news.push(el);
            }
        }));
        data.numLessonsPerGrade.create = news;
        await this.prisma.numLessonsPerGrade.deleteMany({
            where: { subjectId: id, id: { notIn: existants } },
        });
        const subject = await this.prisma.subject.update({
            where: { id },
            data: {
                ...data,
            },
        });
        if (!subject) {
            throw new Error("Disciplina não encontrada");
        }
        return subject;
    }
};
exports.SubjectService = SubjectService;
exports.SubjectService = SubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectService);
//# sourceMappingURL=subject.service.js.map