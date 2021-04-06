import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Validate } from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';
import { CantUpdate } from '../validator/user.validator.';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Validate(CantUpdate)
    userId: number;

    @Validate(CantUpdate)
    email:string;

    @Validate(CantUpdate)
    role:UserRole

}
