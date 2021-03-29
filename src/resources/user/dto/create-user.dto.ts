import { IsEmail, IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "../entities/user_role.interface";
import { BaseUserDto } from "./base-user.dto";

@Entity('user')
export class CreateUserDto extends BaseUserDto {

    
}
