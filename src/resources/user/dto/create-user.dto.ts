import { IsEmail, IsNotEmpty, IsOptional, Validate } from "class-validator";
import { UserRole } from "src/enums/user-role.enum";
import { IsUserAlreadyExist } from "../validator/user.validator.";

export class CreateUserDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsUserAlreadyExist)
    email:string;

    @IsNotEmpty()
    password:string;

    @IsOptional()
    role: UserRole
}
