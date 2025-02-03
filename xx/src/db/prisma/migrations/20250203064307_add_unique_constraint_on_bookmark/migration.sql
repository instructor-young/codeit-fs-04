/*
  Warnings:

  - A unique constraint covering the columns `[userId,tweetId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_tweetId_key" ON "Bookmark"("userId", "tweetId");
