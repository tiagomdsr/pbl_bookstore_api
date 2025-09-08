import { Request, Response } from "express";

import BookService, { CreateBookSchema, UpdateBookSchema } from "../services/book-service";

class BookController {
    static async createBook(request: Request, response: Response) {
        const bookToCreate = CreateBookSchema.parse(request.body);

        const createBook = await BookService.createBook(bookToCreate);

        response.status(201).json({
            data: createBook
        });
    }


    static async listBooks(request: Request, response: Response) {
        const { id, title } = request.query;

        if(id) {
            const getBookById = await BookService.getBookById(Number(id));

            if(getBookById) {
                response.status(200).json({
                    data: getBookById
                });
    
                return
            }

            response.status(404).json({
                data: []
            });

            return;
        }

        if(title) {
            const getBooksByTitle = await BookService.getBooksByTitle(title as string);

            if(getBooksByTitle) {
                response.status(200).json({
                    data: getBooksByTitle
                });
    
                return;
            }

            response.status(404).json({
                data: []
            });

            return;
        }

        const allBooks = await BookService.getAllBooks();

        response.status(200).json({
            data: allBooks
        });
    }

    static async updateBook(request: Request, response: Response) {
        const id = Number(request.params.id);
        const { title, summary } = UpdateBookSchema.parse(request.body);

        const updatedBook = await BookService.updateBook(id, title, summary);

        response.status(200).json({
            data: updatedBook
        });
    }

    static async deleteBook(request: Request, response: Response) {
        const id = Number(request.params.id);

        const deleteBook = await BookService.deleteBook(id);

        response.status(200).json({
            data: deleteBook
        });
    }
}

export default BookController;