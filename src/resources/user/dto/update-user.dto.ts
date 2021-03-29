import { PartialType,OmitType } from '@nestjs/mapped-types';
import { Validate } from 'class-validator';
import { CantUpdateEmail } from '../user.validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @Validate(CantUpdateEmail)
    email:string
   
}
