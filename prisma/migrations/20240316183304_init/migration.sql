/*
  Warnings:

  - You are about to drop the column `diaDaSemana` on the `Aula` table. All the data in the column will be lost.
  - Changed the type of `horarioDeInicio` on the `Aula` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "diaDaSemana",
DROP COLUMN "horarioDeInicio",
ADD COLUMN     "horarioDeInicio" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "DiaDaSemana";
