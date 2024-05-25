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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const schedule_service_1 = require("./schedule.service");
let ScheduleController = class ScheduleController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    generate(metaheuristic, data) {
        return this.scheduleService.generate(metaheuristic, false);
    }
    fixedRecalculation(metaheuristic, data) {
        return this.scheduleService.generate(metaheuristic, data);
    }
    save(data) {
        return this.scheduleService.save(data);
    }
    find() {
        return this.scheduleService.find();
    }
    findOne(id) {
        return this.scheduleService.findOne(id);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Post)("/generate/:metaheuristic"),
    __param(0, (0, common_1.Param)("metaheuristic")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)("/fixed-recalculation/:metaheuristic"),
    __param(0, (0, common_1.Param)("metaheuristic")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "fixedRecalculation", null);
__decorate([
    (0, common_1.Post)("/save"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "save", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "findOne", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, common_1.Controller)("schedule"),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map