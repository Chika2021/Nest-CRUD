import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './model/book,model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UpdateBookDto } from './bookDto/update.dto';

@Injectable()

export class BookService {

    constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<Book>){}

    async findAll(): Promise<Book[]> {
      const books = this.bookModel.find()  
      return books;
    }

    async create(book: Book): Promise<Book>{
      const response = await this.bookModel.create(book)
      return response;
    }

    async findById(id:string ):Promise<Book>{
      const findBook = await this.bookModel.findById(id)
      if(!findBook){
        throw new NotFoundException('Book Not Found')
      }
      return findBook
    }

    async updateById( id: string,  updateBookDto:UpdateBookDto){
        const resp =  this.bookModel.findByIdAndUpdate( id,
          updateBookDto , {
          new:true,
          runValidators:true
        })
        if(!resp) {
          throw new NotFoundException('Book Id not found')
        }
        return resp
    }

    async deleteById(id:string): Promise<Book> {
        const deleteBook = await this.bookModel.findByIdAndDelete(id)
        return deleteBook
    }

   

}
