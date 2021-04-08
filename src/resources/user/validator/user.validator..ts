import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {UserService} from '../service/user.service';
import {Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ModuleRef } from '@nestjs/core';
import { ErrorCode, ErrorMessage } from 'src/enums/error-code.enum';

@ValidatorConstraint({ name: ErrorCode.NOT_UNIQUE, async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
    private userService: UserService
	
    constructor(private readonly moduleRef: ModuleRef) { }
	async validate(text: string) {
        if (text == undefined) return true;
        if (!this.userService) {
            this.userService = this.moduleRef.get('UserService');
          }
        let user:User = await this.userService.findByEmail(text);
        console.log(user)
		return user==undefined;
	}
    defaultMessage(args: ValidationArguments) {
        return `${ErrorMessage.EMAIL_EXIST}`;
      }

}

@ValidatorConstraint({ name: ErrorCode.CANT_UPDATE})
export class CantUpdate implements ValidatorConstraintInterface {
	
    constructor() { }
	validate(text: string) {
		return false;
	}
    defaultMessage(args: ValidationArguments) {
        return `${ErrorMessage.EMAIL_CANT_UPDATE}`;
      }

}
