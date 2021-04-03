import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { UserRole } from "src/enums/user-role.enum";
import { Column, Entity } from "typeorm";

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
