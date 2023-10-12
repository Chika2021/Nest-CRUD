import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './model/book,model';
import { BookDto } from './bookDto/book.dto';
import { UpdateBookDto } from './bookDto/update.dto';
import { REQUEST } from '@nestjs/core';


@Controller('book')
export class BookController {
    constructor(private booksService:BookService){}

    @Get() 
        async getAllBooks():Promise<Book[]> {
            return await this.booksService.findAll()
    }
    @Post()
        async createBook(
            @Body()
            book:BookDto
        ): Promise<Book>{
            return await this.booksService.create(book)
    }

    @Get(':id')
        async findBook(@Param('id') id:string) {
            return await this.booksService.findById(id)
        }

    @Put(':id')
        async update(@Param('id') id:string , @Body() updateBookDto:UpdateBookDto):Promise<Book> {
                return  this.booksService.updateById(id, updateBookDto)
        }

    @Delete(':id')
        async  deleteBook(@Param('id') id:string):Promise<Book>{
            return await this.booksService.deleteById(id)
        }

  
   

}
