-- AlterTable
ALTER TABLE "Location" ADD COLUMN "mapX" REAL;
ALTER TABLE "Location" ADD COLUMN "mapY" REAL;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'resident',
    "occupation" TEXT,
    "description" TEXT,
    "secrets" TEXT,
    "notes" TEXT,
    "alive" BOOLEAN NOT NULL DEFAULT true,
    "primaryLocationId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Character_primaryLocationId_fkey" FOREIGN KEY ("primaryLocationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("alive", "createdAt", "description", "id", "name", "notes", "occupation", "role", "secrets", "updatedAt") SELECT "alive", "createdAt", "description", "id", "name", "notes", "occupation", "role", "secrets", "updatedAt" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
