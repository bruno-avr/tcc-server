/*
  Warnings:

  - Changed the type of `diaDaSemana` on the `Aula` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `diaDaSemana` on the `HorariosDisponiveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "diaDaSemana",
ADD COLUMN     "diaDaSemana" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HorariosDisponiveis" DROP COLUMN "diaDaSemana",
ADD COLUMN     "diaDaSemana" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "DiaDaSemana";
