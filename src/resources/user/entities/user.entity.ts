import { IsEmail, IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseUserDto } from "../dto/base-user.dto";
import { UserRole } from "./user_role.interface";

@Entity('user')
export class User extends BaseUserDto {
    @PrimaryGeneratedColumn()
    id: number;
}

