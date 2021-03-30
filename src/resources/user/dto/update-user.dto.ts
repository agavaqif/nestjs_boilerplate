import { PartialType,OmitType } from '@nestjs/mapped-types';
import { Validate } from 'class-validator';
import { CantUpdateEmail } from '../user.validator';
import { BaseUserDto } from './base-user.dto';


export class UpdateUserDto extends PartialType(BaseUserDto) {

    @Validate(CantUpdateEmail)
    email:string
   
}
