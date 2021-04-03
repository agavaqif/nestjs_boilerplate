import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseUserDto } from "../dto/base-user.dto";

@Entity('user')
export class User extends BaseUserDto {
    @PrimaryGeneratedColumn()
    id: number;
}

