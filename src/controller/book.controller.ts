import * as express from 'express';
import {getManager, getRepository} from 'typeorm';
import Controller from '../interfaces/controller.interface';
import Book, {Langs} from '../entities/book.entity';
import AppError from "../utils/app.error";

class BookController implements Controller {
    public path = '/books/';
    public router = express.Router();
    private bookRepository = getRepository(Book);
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(this.path, this.createBook);
        this.router.get(this.path, this.getAllBooks);
        this.router.get(`${this.path}:id`, this.getBookById);
        this.router.patch(`${this.path}:id`, this.updateBook);
        this.router.delete(`${this.path}:id`, this.deleteBook);
    }
    private createBook = async (request: express.Request, response: express.Response) => {
        const bookData = request.body;
        const newBook = this.bookRepository.create(bookData);
        await this.bookRepository.save(newBook);
        response.status(200).json({
            success: true,
            data: newBook
        });
    }
    private getAllBooks = async (request: express.Request, response: express.Response) => {
       try {
           if (request.query.lang) {
               if((request.query.lang).toString().toUpperCase() in Langs){
                   let books = await this.bookRepository.find({where: {lang: request.query.lang}});
                   response.status(200).json({
                       success: true,
                       data: books
                   });
               }
               else{
                   throw new AppError('Oops, there is no data in that language',400);
               }
           }
           else {
              let books = await this.bookRepository.find();
               response.status(200).json({
                   success: true,
                   data: books
               });
           }
       }
       catch (err) {
           response.status(400).json({
               success: false,
               message:err.message
           })
       }
    }
    private getBookById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try{
            const id = request.params.id;
            const book = await this.bookRepository.findOne(id);
            if (book) {
                response.status(200).json({
                    success: true,
                    data: book
                });
                // response.send(book);
            } else {
               throw new AppError('Not found', 404)
            }
        }
        catch (err) {
            response.json({
                success: false,
                message:err.message
            })
        }
    }
    private updateBook = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try{
            const id = request.params.id;
            const bookData: Book = request.body;
            await this.bookRepository.update(id, bookData);
            const updatedBook = await this.bookRepository.findOne(id);
            if (updatedBook) {
                response.status(200).json({
                    success: true,
                    data: updatedBook
                });
            } else {
                throw new AppError('Not found', 404)
            }
        }
        catch (err) {
            response.json({
                success: false,
                message:err.message
            })
        }
    }
    private deleteBook = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try{
            const id = request.params.id;
            const deleteResponse = await this.bookRepository.delete(id);
            if (deleteResponse) {
                response.status(200).json({
                    success: true
                });
            } else {
               throw new AppError('Not found',404);
            }
        }
        catch (err){
            response.json({
                success: false,
                message:err.message
            })
        }
    }
}
export default BookController;