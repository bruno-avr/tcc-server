/*
  Warnings:

  - You are about to drop the `_SubjectToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_B_fkey";

-- DropTable
DROP TABLE "_SubjectToTeacher";

-- CreateTable
CREATE TABLE "SubjectPerClass" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "subjectPerGradeId" TEXT NOT NULL,
    "numWeeklyLessons" INTEGER NOT NULL,

    CONSTRAINT "SubjectPerClass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubjectPerClass" ADD CONSTRAINT "SubjectPerClass_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectPerClass" ADD CONSTRAINT "SubjectPerClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectPerClass" ADD CONSTRAINT "SubjectPerClass_subjectPerGradeId_fkey" FOREIGN KEY ("subjectPerGradeId") REFERENCES "SubjectPerGrade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
