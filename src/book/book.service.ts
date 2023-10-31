import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './model/book,model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UpdateBookDto } from './bookDto/update.dto';
import { Query  }  from 'express-serve-static-core'
import { User } from 'src/auth/model/user.model';

@Injectable()

export class BookService {

    constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<Book>){}

    async findAll(query:Query): Promise<Book[]> {
      //Page Pagination
      const resPerPage = 2
      const currentPage = Number(query.page) || 1
      const skip = resPerPage * (currentPage - 1)
      
      //Query For Search
      const title = query.title ? {
        title: {
          $regex: query.title,
          $options: 'i'
        } 
      } : {}

      const books = this.bookModel.find({...title}) .limit(resPerPage) . skip(skip)
    
      return books;
    }

    async create(book: Book , user:User): Promise<Book>{

      const data = Object.assign(book , {user:user._id})

      const response = await this.bookModel.create(book)
      return response;
    }

    async findById(id:string ):Promise<Book>{
      const isValidId = mongoose.isValidObjectId(id)

      if(!isValidId){
        throw new BadRequestException('Please Enter Correct ID')
      }

      const findBook = await this.bookModel.findById(id)
      if(!findBook) {
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
