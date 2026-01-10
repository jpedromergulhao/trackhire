/*
  Warnings:

  - Added the required column `seniority` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Seniority" AS ENUM ('NONE', 'JUNIOR', 'MID', 'SENIOR');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "seniority" "Seniority" NOT NULL;
