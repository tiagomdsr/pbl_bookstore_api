/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `publishers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cellphone]` on the table `publishers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "publishers_address_key" ON "publishers"("address");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_cellphone_key" ON "publishers"("cellphone");
