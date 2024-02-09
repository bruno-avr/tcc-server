-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "serieId" TEXT NOT NULL,
    CONSTRAINT "Turma_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "turmaId" TEXT NOT NULL,
    CONSTRAINT "Horario_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HorariosDisponiveis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "diaDaSemana" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Hora" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hora" TEXT NOT NULL,
    "horariosDisponiveisId" TEXT NOT NULL,
    CONSTRAINT "Hora_horariosDisponiveisId_fkey" FOREIGN KEY ("horariosDisponiveisId") REFERENCES "HorariosDisponiveis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "horarioId" TEXT NOT NULL,
    CONSTRAINT "Aula_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Horario_turmaId_key" ON "Horario"("turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "Hora_horariosDisponiveisId_key" ON "Hora"("horariosDisponiveisId");
