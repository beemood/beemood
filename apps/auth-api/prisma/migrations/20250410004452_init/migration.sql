/*
  Warnings:

  - You are about to drop the `rolePermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rolePermission" DROP CONSTRAINT "rolePermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "rolePermission" DROP CONSTRAINT "rolePermission_roleId_fkey";

-- DropTable
DROP TABLE "rolePermission";

-- CreateTable
CREATE TABLE "rolepermission" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "rolepermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rolepermission_permissionId_roleId_key" ON "rolepermission"("permissionId", "roleId");

-- AddForeignKey
ALTER TABLE "rolepermission" ADD CONSTRAINT "rolepermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolepermission" ADD CONSTRAINT "rolepermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
