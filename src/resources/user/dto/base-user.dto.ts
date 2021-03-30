import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { Column, Entity } from "typeorm";
import { UserRole } from "../entities/user_role.interface";

@Injectable()
@Entity('user')
export class BaseUserDto {

    @Column()
    name: string;

    @Column({unique: true,update:false})
    @IsNotEmpty({message:"Email cant be empty"})
    @IsEmail({},{message: "Please use email format"})
    email:string;

    @Column({select: false})
    password: string

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole
}
