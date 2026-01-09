/*
  Warnings:

  - Added the required column `desiredJob` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "desiredJob" TEXT NOT NULL,
ADD COLUMN     "desiredSalary" INTEGER;
