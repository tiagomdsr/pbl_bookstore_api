-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(24) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "address" TEXT NOT NULL,
    "cellphone" VARCHAR(16) NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);
