/*
  Warnings:

  - You are about to drop the column `followrId` on the `Following` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Following" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerId" TEXT NOT NULL,
    "followedId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Following_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Following_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Following" ("createdAt", "followedId", "id") SELECT "createdAt", "followedId", "id" FROM "Following";
DROP TABLE "Following";
ALTER TABLE "new_Following" RENAME TO "Following";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
