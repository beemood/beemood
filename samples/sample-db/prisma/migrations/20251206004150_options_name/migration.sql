/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Sample` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Passive');

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT[],
ADD COLUMN     "price" DECIMAL(8,2) NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "sampleId" INTEGER,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sample_uuid_key" ON "Sample"("uuid");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE SET NULL ON UPDATE CASCADE;
