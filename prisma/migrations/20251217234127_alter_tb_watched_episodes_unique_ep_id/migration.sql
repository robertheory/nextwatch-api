/*
  Warnings:

  - A unique constraint covering the columns `[episode_id]` on the table `watched_episodes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ShowStatus" ADD VALUE 'UNTRACKED';

-- AlterTable
ALTER TABLE "watched_episodes" ALTER COLUMN "watched_at" DROP NOT NULL,
ALTER COLUMN "watched_at" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "watched_episodes_episode_id_key" ON "watched_episodes"("episode_id");
