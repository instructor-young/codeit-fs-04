/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `providerId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "providerName" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "encryptedPassword", "id", "updatedAt") SELECT "createdAt", "encryptedPassword", "id", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_providerName_providerId_key" ON "User"("providerName", "providerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
