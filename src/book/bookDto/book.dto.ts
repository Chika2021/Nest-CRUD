import { IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Category } from "../model/book,model"
import { User } from "src/auth/model/user.model"


export class BookDto {
    @IsNotEmpty()
    @IsString()
        readonly title: string
    
    @IsNotEmpty()
    @IsString()
        readonly description: string
    
    @IsNotEmpty()
    @IsString()
        readonly author: string
    
    @IsNotEmpty()
    @IsString()
        readonly price: number
    @IsEnum(Category , {message: 'Please Enter Correct Category'})
        readonly category: Category
    
    @IsEmpty({message:'You Cannot Pass User Id'})
    readonly user: User;
}