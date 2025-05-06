/*
  Warnings:

  - Added the required column `category` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Cards" ("content", "createdAt", "id", "owner", "shared", "title", "updatedAt") SELECT "content", "createdAt", "id", "owner", "shared", "title", "updatedAt" FROM "Cards";
DROP TABLE "Cards";
ALTER TABLE "new_Cards" RENAME TO "Cards";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
