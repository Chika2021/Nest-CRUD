import { Category } from "../model/book,model"


export class BookDto {
    readonly title: string
    readonly description: string
    readonly author: string
    readonly price: number
    readonly category: Category
}