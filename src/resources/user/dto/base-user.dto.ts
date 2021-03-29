import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthService } from "src/shared/auth/service/auth.service";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "../entities/user_role.interface";

@Entity('user')
export class BaseUserDto {
    constructor(){}

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
    
    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLocaleLowerCase();
    }
}