import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { AuthService } from "src/shared/auth/service/auth.service";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "../entities/user_role.interface";
import { IsUserAlreadyExist } from "../user.validator";

@Entity('user')
export class BaseUserDto {
    constructor(){}

    @Column()
    name: string;

    @Column({unique: true,update:false})
    @IsNotEmpty({message:"Email cant be empty"})
    @IsEmail({},{message: "Please use email format"})
    @Validate(IsUserAlreadyExist)
    email:string;

    @Column({select: false})
    password: string

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole
    
    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase() {
        if(this.email != undefined)this.email = this.email.toLocaleLowerCase();        
    }

}
