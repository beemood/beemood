-- CreateTable
CREATE TABLE "PriceLevel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "taxrate" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "PriceLevel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PriceLevel_id_key" ON "PriceLevel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PriceLevel_name_key" ON "PriceLevel"("name");
