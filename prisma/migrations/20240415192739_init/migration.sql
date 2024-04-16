/*
  Warnings:

  - You are about to drop the column `numWeeklyLessons` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `_GradeToSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GradeToSubject" DROP CONSTRAINT "_GradeToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_GradeToSubject" DROP CONSTRAINT "_GradeToSubject_B_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "numWeeklyLessons";

-- DropTable
DROP TABLE "_GradeToSubject";

-- CreateTable
CREATE TABLE "NumLessonsPerGrade" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "numWeeklyLessons" INTEGER NOT NULL,

    CONSTRAINT "NumLessonsPerGrade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NumLessonsPerGrade" ADD CONSTRAINT "NumLessonsPerGrade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NumLessonsPerGrade" ADD CONSTRAINT "NumLessonsPerGrade_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
