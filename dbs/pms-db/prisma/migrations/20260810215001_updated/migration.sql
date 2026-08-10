-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "externalId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),
    "dob" DATE NOT NULL,
    "shiftStart" TIME(0),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "bio" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "age" SMALLINT,
    "heightCm" INTEGER NOT NULL,
    "weightGrams" INTEGER NOT NULL,
    "salary" DECIMAL(12,2) NOT NULL,
    "commissionRate" DECIMAL(5,4) NOT NULL DEFAULT 0.0000,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "settings" JSONB NOT NULL DEFAULT '{}',
    "avatar" BYTEA,
    "tags" TEXT[],
    "scores" INTEGER[],

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_uuid_key" ON "user_profiles"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "user_profiles"("email");

-- CreateIndex
CREATE INDEX "user_profiles_email_idx" ON "user_profiles"("email");

-- CreateIndex
CREATE INDEX "user_profiles_createdAt_idx" ON "user_profiles"("createdAt");

-- CreateIndex
CREATE INDEX "user_profiles_deletedAt_isActive_idx" ON "user_profiles"("deletedAt", "isActive");
