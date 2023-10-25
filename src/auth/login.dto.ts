import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"



export class LoginDto {

    
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter password'})
        readonly email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
        readonly password: string
}
