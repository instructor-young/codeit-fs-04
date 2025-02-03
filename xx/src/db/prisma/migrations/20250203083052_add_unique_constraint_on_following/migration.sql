/*
  Warnings:

  - A unique constraint covering the columns `[followerId,followedId]` on the table `Following` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Following_followerId_followedId_key" ON "Following"("followerId", "followedId");
