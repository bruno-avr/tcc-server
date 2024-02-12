/*
  Warnings:

  - Changed the type of `diaDaSemana` on the `Aula` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `diaDaSemana` on the `HorariosDisponiveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DiaDaSemana" AS ENUM ('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO');

-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "diaDaSemana",
ADD COLUMN     "diaDaSemana" "DiaDaSemana" NOT NULL;

-- AlterTable
ALTER TABLE "HorariosDisponiveis" DROP COLUMN "diaDaSemana",
ADD COLUMN     "diaDaSemana" "DiaDaSemana" NOT NULL;
