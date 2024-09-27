-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Guest',
    "description" TEXT NOT NULL,
    "lastActiveTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLoggedIn" BOOLEAN NOT NULL DEFAULT false
);
