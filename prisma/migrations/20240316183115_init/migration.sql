/*
  Warnings:

  - You are about to drop the `DisciplinaPorSerie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hora` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HorariosDisponiveis` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `numAulasSemanais` to the `Disciplina` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DisciplinaPorSerie" DROP CONSTRAINT "DisciplinaPorSerie_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplinaPorSerie" DROP CONSTRAINT "DisciplinaPorSerie_serieId_fkey";

-- DropForeignKey
ALTER TABLE "Hora" DROP CONSTRAINT "Hora_horariosDisponiveisId_fkey";

-- DropForeignKey
ALTER TABLE "HorariosDisponiveis" DROP CONSTRAINT "HorariosDisponiveis_turmaId_fkey";

-- AlterTable
ALTER TABLE "Disciplina" ADD COLUMN     "numAulasSemanais" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Turma" ADD COLUMN     "horariosDisponiveis" INTEGER[];

-- DropTable
DROP TABLE "DisciplinaPorSerie";

-- DropTable
DROP TABLE "Hora";

-- DropTable
DROP TABLE "HorariosDisponiveis";

-- CreateTable
CREATE TABLE "_DisciplinaToSerie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplinaToSerie_AB_unique" ON "_DisciplinaToSerie"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplinaToSerie_B_index" ON "_DisciplinaToSerie"("B");

-- AddForeignKey
ALTER TABLE "_DisciplinaToSerie" ADD CONSTRAINT "_DisciplinaToSerie_A_fkey" FOREIGN KEY ("A") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplinaToSerie" ADD CONSTRAINT "_DisciplinaToSerie_B_fkey" FOREIGN KEY ("B") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
