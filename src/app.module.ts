import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./exception.filter";
import { TeacherModule } from "./modules/teacher/teacher.module";
import { SubjectModule } from "./modules/subject/subject.module";
import { GradeModule } from "./modules/grade/grade.module";
import { ClassModule } from "./modules/class/class.module";
import { ScheduleModule } from "./modules/schedule/schedule.module";

@Module({
  imports: [
    TeacherModule,
    SubjectModule,
    GradeModule,
    ClassModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
