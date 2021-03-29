import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {UserService} from './user.service';
import {Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ModuleRef } from '@nestjs/core';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
    private userService: UserService
	
    constructor(private readonly moduleRef: ModuleRef) { }
	async validate(text: string) {
        if (!this.userService) {
            this.userService = this.moduleRef.get('UserService');
          }
        console.log("Text is",text)
		return !this.userService.findByEmail(text);
	}
    defaultMessage(args: ValidationArguments) {
        return 'User with this email already exists.';
      }

}

