-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "providerName" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "encryptedPassword" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "encryptedPassword", "id", "providerId", "providerName", "updatedAt") SELECT "createdAt", "encryptedPassword", "id", "providerId", "providerName", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_providerName_providerId_key" ON "User"("providerName", "providerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
