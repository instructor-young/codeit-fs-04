-- CreateTable
CREATE TABLE "Following" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followrId" TEXT NOT NULL,
    "followedId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Following_followrId_fkey" FOREIGN KEY ("followrId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Following_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
