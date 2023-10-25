import { IsEmpty, IsOptional, IsString, isEmpty } from "class-validator"
import { Category } from "../model/book,model"
import { User } from "src/auth/model/user.model"


export class UpdateBookDto {
    @IsOptional()
    @IsString()
        readonly title: string
    
    @IsOptional()
    @IsString()
        readonly description: string

    @IsOptional()
    @IsString()
        readonly author: string
    
    @IsOptional()
    @IsString()
        readonly price: number

    @IsOptional()
        readonly category: Category
    
    @IsEmpty({message:'You Cannot Pass User Id'})
    readonly user:User;
}