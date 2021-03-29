import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {UserService} from './user.service';
import {Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
	constructor() {}

	async validate(text: string) {
		return !true;
	}
    defaultMessage(args: ValidationArguments) {
        return 'User with this email already exists.';
      }

}