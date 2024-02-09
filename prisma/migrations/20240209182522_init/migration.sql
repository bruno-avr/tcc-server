/*
  Warnings:

  - Added the required column `disciplinaId` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Aula` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aula" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "horarioId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    CONSTRAINT "Aula_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Aula_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Aula_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aula" ("horarioId", "id") SELECT "horarioId", "id" FROM "Aula";
DROP TABLE "Aula";
ALTER TABLE "new_Aula" RENAME TO "Aula";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
