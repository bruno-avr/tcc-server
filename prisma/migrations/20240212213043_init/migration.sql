/*
  Warnings:

  - You are about to drop the column `horarioId` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the `Horario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `turmaId` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turmaId` to the `HorariosDisponiveis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_horarioId_fkey";

-- DropForeignKey
ALTER TABLE "Horario" DROP CONSTRAINT "Horario_turmaId_fkey";

-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "horarioId",
ADD COLUMN     "turmaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HorariosDisponiveis" ADD COLUMN     "turmaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Horario";

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorariosDisponiveis" ADD CONSTRAINT "HorariosDisponiveis_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
