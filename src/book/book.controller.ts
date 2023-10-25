import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './model/book,model';
import { BookDto } from './bookDto/book.dto';
import { UpdateBookDto } from './bookDto/update.dto';
import { REQUEST } from '@nestjs/core';

import { Query as ExpressQuery }  from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
    constructor(private booksService:BookService){}

    @Get()
    @UseGuards(AuthGuard())
        async getAllBooks(@Query() query:ExpressQuery):Promise<Book[]> {
            return await this.booksService.findAll(query)
    }
    @Post()
    @UseGuards(AuthGuard())
        async createBook(
            @Body()
            book:BookDto,
            @Req() req
        ): Promise<Book>{
            return await this.booksService.create(book , req.user)
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
