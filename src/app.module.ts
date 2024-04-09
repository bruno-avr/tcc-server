import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./exception.filter";
import { TeacherModule } from "./modules/teacher/teacher.module";
import { SubjectModule } from "./modules/subject/subject.module";

@Module({
  imports: [TeacherModule, SubjectModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
