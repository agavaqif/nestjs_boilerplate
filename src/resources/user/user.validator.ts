import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {UserService} from './user.service';
import {Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ModuleRef } from '@nestjs/core';
import { ErrorCode, ErrorMessage } from 'src/enums/error-codes.enum';

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
        console.log("Text is",text)
		return !this.userService.findByEmail(text);
	}
    defaultMessage(args: ValidationArguments) {
        return `User Email ${ErrorMessage.NOT_UNIQUE}`;
      }

}

@ValidatorConstraint({ name: ErrorCode.CANT_UPDATE})
export class CantUpdateEmail implements ValidatorConstraintInterface {
	
    constructor() { }
	validate(text: string) {
        console.log("Text is",text)
		return false;
	}
    defaultMessage(args: ValidationArguments) {
        return `Email ${ErrorMessage.CANT_UPDATE}`;
      }

}
