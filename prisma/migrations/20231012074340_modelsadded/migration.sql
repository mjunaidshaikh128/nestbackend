/*
  Warnings:

  - Added the required column `capacity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enginePower` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Item_typeId_key";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "bathrooms" TEXT,
ADD COLUMN     "berths" TEXT,
ADD COLUMN     "cabins" TEXT,
ADD COLUMN     "capacity" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "draft" TEXT,
ADD COLUMN     "enginePower" TEXT NOT NULL,
ADD COLUMN     "length" TEXT NOT NULL,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "manufacturer" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "about" TEXT NOT NULL,
    "verifiedProfile" BOOLEAN NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "languagesSpoken" TEXT,
    "responseTime" TEXT,
    "responseRate" TEXT,
    "contactEmail" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EquipmentToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToItem_AB_unique" ON "_EquipmentToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToItem_B_index" ON "_EquipmentToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToService_AB_unique" ON "_ItemToService"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToService_B_index" ON "_ItemToService"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToItem" ADD CONSTRAINT "_EquipmentToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToItem" ADD CONSTRAINT "_EquipmentToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToService" ADD CONSTRAINT "_ItemToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToService" ADD CONSTRAINT "_ItemToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
