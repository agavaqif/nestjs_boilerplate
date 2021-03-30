import { IsEmail, IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "../entities/user_role.interface";
import { BaseUserDto } from "./base-user.dto";
import { Validate } from 'class-validator';
import { IsUserAlreadyExist } from "../user.validator";



@Entity('user')
export class CreateUserDto extends BaseUserDto {

    @IsNotEmpty({message: "Please provide name"})
    name:string

    @IsNotEmpty({message:"Please provide email"})
    @IsEmail({},{message: "Please use email format"})
    @Validate(IsUserAlreadyExist)
    email:string

    @IsNotEmpty({message: "Please provide password"})
    password:string
}
