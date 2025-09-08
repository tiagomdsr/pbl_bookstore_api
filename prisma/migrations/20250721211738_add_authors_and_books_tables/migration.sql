-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(96) NOT NULL,
    "cellphone" VARCHAR(16) NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "release_year" VARCHAR(4) NOT NULL,
    "pages" INTEGER NOT NULL,
    "isbn" VARCHAR(13) NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_author" TEXT NOT NULL,
    "id_publisher" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authors_email_key" ON "authors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "authors_cellphone_key" ON "authors"("cellphone");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_id_publisher_fkey" FOREIGN KEY ("id_publisher") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
