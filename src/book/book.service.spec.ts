import { Mode } from "fs"
import { BookService } from "./book.service"
import { Book, Category } from "./model/book,model"
import { async } from "rxjs"
import { Test, TestingModule } from "@nestjs/testing"
import { getModelToken } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { mock } from "node:test"



describe('BookService' , () => {
    let bookService:BookService;
    let model: Model<Book>;

    const mockBook = 
    {
        
        "_id": "653146914f4554e49f62fc9a",
        "title": "Melodies of Alahambra",
        "description": "Story",
        "author": "Williams Gilbert",
        "price": 500,
        "category": Category.ADVENTURE,
        "user": {
          "$oid": "65313c1d327ebafb84325a03"
        },
        "createdAt": {
          "$date": "2023-10-19T15:09:05.710Z"
        },
        "updatedAt": {
          "$date": "2023-10-19T15:09:05.710Z"
        },
        "__v": 0
      }

    const  mockBookService ={
        findById: jest.fn()
    }

    beforeEach(async () => {
        const module:TestingModule = await Test.createTestingModule({
            providers: [
                BookService, 
                {
                     provide: getModelToken(Book.name),
                     useValue: mockBookService
                },
            ],
        }).compile();

        bookService = module.get<BookService>(BookService)
        model = module.get<Model <Book>>(getModelToken(Book.name))
    })

    describe('findById' , () => {
        it('Should find and return a book by Id' ,async () => {
            jest.spyOn(model , 'findById').mockResolvedValue(mockBook)

            const result = await bookService.findById(mockBook._id)

            expect(model.findById).toHaveBeenCalledWith(mockBook._id)

            expect(result).toEqual(mockBook)
        })
    })

});