-- CreateTable
CREATE TABLE "public"."Sample" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intValue" INTEGER,
    "decimalValue" DECIMAL(65,30),
    "booleanValue" BOOLEAN,
    "jsonValue" JSONB,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);
