import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import { SignUpDto } from './signup.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<User>, private jwtService: JwtService){}

    async signUp(signUpDto: SignUpDto) :Promise<{token:string}> {

        const {name , email , password } = signUpDto

        const hashedPassword = await bcrypt.hash(password , 10)

        const user = await this.userModel.create({
            name, 
            email,
            password : hashedPassword
        })

        const token = this.jwtService.sign({id: user._id})

        return {token}
    }

    async login(loginDto:LoginDto){

        const {email , password} = loginDto

        const  user = await this.userModel.findOne({email})

        // console.log(user)

        if(!user){
            throw new UnauthorizedException('Invalid Email Or Password')
        }
        const isPasswordMatched = await bcrypt.compare(password , user.password )
 
        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid  Password')
        }

        const token   = this.jwtService.sign({id: user._id})

        return {token}

    }

}
 