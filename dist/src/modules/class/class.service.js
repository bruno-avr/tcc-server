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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ClassService = class ClassService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (!data.grade.connect.id)
            throw new Error('O campo "Série" é obrigatório.');
        if (!data.section)
            throw new Error('O campo "Código da Turma" é obrigatório.');
        const classExists = await this.prisma.class.findFirst({
            where: { gradeId: data.grade.connect.id, section: data.section },
        });
        if (classExists)
            throw new Error("Já existe uma turma registrada com esse nome.");
        const _class = await this.prisma.class.create({
            data: {
                ...data,
            },
        });
        return _class;
    }
    async find() {
        const classes = await this.prisma.class.findMany({
            include: {
                grade: true,
            },
            orderBy: [{ grade: { name: "asc" } }, { section: "asc" }],
        });
        return classes;
    }
    async findOne(id) {
        const _class = await this.prisma.class.findFirst({
            where: { id },
        });
        if (!_class) {
            throw new Error("Class not found");
        }
        return _class;
    }
    async update(id, data) {
        if (!data.grade.connect.id)
            throw new Error('O campo "Série" é obrigatório.');
        if (!data.section)
            throw new Error('O campo "Código da Turma" é obrigatório.');
        const classExists = await this.prisma.class.findFirst({
            where: { gradeId: data.grade.connect.id, section: String(data.section) },
        });
        if (classExists && classExists.id !== id)
            throw new Error("Já existe uma turma registrada com esse nome.");
        const _class = await this.prisma.class.update({
            where: { id },
            data: {
                ...data,
            },
        });
        if (!_class) {
            throw new Error("Série não encontrada");
        }
        return _class;
    }
    async remove(id) {
        await this.prisma.class.delete({ where: { id } });
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassService);
//# sourceMappingURL=class.service.js.map