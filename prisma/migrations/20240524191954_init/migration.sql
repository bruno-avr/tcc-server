/*
  Warnings:

  - You are about to drop the column `scheduleJSON` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `isFeasible` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedulesJSON` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selfMade` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "scheduleJSON",
ADD COLUMN     "isFeasible" BOOLEAN NOT NULL,
ADD COLUMN     "schedulesJSON" JSONB NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "selfMade" BOOLEAN NOT NULL;
