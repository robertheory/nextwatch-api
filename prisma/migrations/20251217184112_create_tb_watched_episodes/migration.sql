/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `shows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shows" DROP COLUMN "deleted_at";

-- CreateTable
CREATE TABLE "watched_episodes" (
    "id" SERIAL NOT NULL,
    "show_id" INTEGER NOT NULL,
    "episode_id" INTEGER NOT NULL,
    "watched_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watched_episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "watched_episodes_show_id_episode_id_key" ON "watched_episodes"("show_id", "episode_id");

-- AddForeignKey
ALTER TABLE "watched_episodes" ADD CONSTRAINT "watched_episodes_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("show_id") ON DELETE CASCADE ON UPDATE CASCADE;
