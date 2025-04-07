-- CreateTable
CREATE TABLE "Hello" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "message" TEXT NOT NULL,

    CONSTRAINT "Hello_pkey" PRIMARY KEY ("id")
);
