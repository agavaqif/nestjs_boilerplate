import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity } from "typeorm"

@Entity('user')
export class LoginUserDto  {

    @IsNotEmpty({message:"Please provide email"})
    @IsEmail({},{message: "Please use email format"})
    email:string

    @IsNotEmpty({message: "Please provide password"})
    password:string
}