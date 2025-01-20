/*
  Warnings:

  - A unique constraint covering the columns `[movieId,userId]` on the table `MovieLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieLike_movieId_userId_key" ON "MovieLike"("movieId", "userId");
