-- CreateEnum
CREATE TYPE "ShowStatus" AS ENUM ('NOT_STARTED', 'WATCHING', 'FINISHED');

-- CreateTable
CREATE TABLE "shows" (
    "id" SERIAL NOT NULL,
    "show_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "shows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shows_show_id_key" ON "shows"("show_id");
