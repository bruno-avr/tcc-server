import { PrismaService } from "../../database/prisma.service";
export declare class ScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    generate(): Promise<any>;
}
