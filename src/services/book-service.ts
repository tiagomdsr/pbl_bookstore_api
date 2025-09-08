import * as zod from "zod";

import { PrismaClient, Book  } from "../generated/prisma";
import { BusinessError } from "../errors/errors";

export const CreateBookSchema = zod.object({
    title: zod.string(),
    summary: zod.string(),
    release_year: zod.string().regex(/^[0-9]+$/).min(4).max(4),
    pages: zod.int().positive(),
    isbn: zod.string().regex(/^[0-9]+$/).min(13).max(13),
    id_category: zod.int(),
    id_author: zod.string(),
    id_publisher: zod.string(),
});

export const UpdateBookSchema = zod.object({
    title: zod.string().optional(),
    summary: zod.string().optional(),
});

class BookService {
    static async createBook(bookToCreate: Omit<Book, "id">): Promise<Book> {
        const prisma = new PrismaClient();

        const existingBook: Book | null = await prisma.book.findFirst({
            where: {
                isbn: bookToCreate.isbn
            }
        });

        if(existingBook) {
            throw new BusinessError("Livro já existente");
        }

        const validateCategory = await prisma.category.findUnique({
            where: {
                id: bookToCreate.id_category
            }
        });

        if(!validateCategory) {
            throw new BusinessError("Categoria inválida");
        }

        const validateAuthor = await prisma.author.findUnique({
            where: {
                id: bookToCreate.id_author
            }
        });

        if(!validateAuthor) {
            throw new BusinessError("Autor(a) inválido(a)");
        }

        const validatePublisher = await prisma.publisher.findUnique({
            where: {
                id: bookToCreate.id_publisher
            }
        });

        if(!validatePublisher) {
            throw new BusinessError("Editora inválida");
        }

        const createdBook = await prisma.book.create({
            data: bookToCreate
        });


        return createdBook;
    }

    static async getBookById(id: number): Promise<Book | null> {
        const prisma = new PrismaClient();

        const booksById: Book | null = await prisma.book.findUnique({
            where: {
                id: Number(id)
            }
        });

        return booksById;
    }

    static async getBooksByTitle(title: string): Promise<Book[]> {
        const prisma = new PrismaClient();

        const booksByTitle: Book[] = await prisma.book.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive"
                }
            }
        });

        return booksByTitle;
    }

    static async getAllBooks(): Promise<Book[]> {
        const prisma = new PrismaClient();

        const allBooks: Book[] = await prisma.book.findMany();

        return allBooks;
    }

    static async updateBook(id: number, title?: string, summary?: string): Promise<Book> {
        const prisma = new PrismaClient();

        const verifyId = await prisma.book.findUnique({
            where: {id}
        });

        if(!verifyId) {
            throw new BusinessError("ID inválido");
        }

        if(!title && !summary) {
            throw new BusinessError("Campos de title e summary vazios, preencha pelo menos um");
        }

        const updateBook = await prisma.book.update({
            where: {id},
            data: {
                ...(title && {title}),
                ...(summary && {summary})
            }
        });

        return updateBook;
    }

    static async deleteBook(id: number): Promise<Book> {
        const prisma = new PrismaClient();

        const verifyId = await prisma.book.findUnique({
            where: {id}
        });

        if(!verifyId) {
            throw new BusinessError("ID inválido");
        }

        const deletedBook = await prisma.book.delete({
            where: {id}
        });

        return deletedBook;
    }
}

export default BookService;