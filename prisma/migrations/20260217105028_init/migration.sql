/*
  Warnings:

  - You are about to drop the column `age` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `concern` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `hairLossStage` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `preferredDate` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `treatment` on the `leads` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "LeadStatus" ADD VALUE 'ERROR';

-- AlterTable
ALTER TABLE "leads" DROP COLUMN "age",
DROP COLUMN "concern",
DROP COLUMN "hairLossStage",
DROP COLUMN "preferredDate",
DROP COLUMN "treatment",
ADD COLUMN     "pageUrl" TEXT,
ADD COLUMN     "userAgent" TEXT;
