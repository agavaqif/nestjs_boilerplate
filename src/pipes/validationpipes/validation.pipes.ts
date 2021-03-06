
import {PipeTransform, ArgumentMetadata, Injectable} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationError } from '../../shared/response/validation-error.class'
import { ResponseError } from 'src/shared/response/response.class';
import { ErrorCode, ErrorMessage } from 'src/enums/error-code.enum';

/**
 * Validation pipeline which works with class-validator. Catch validation issues and throw
 * Validation Error which will be caugh and dealth with by AllExpception Filter
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (!value) {
      throw new ValidationError( this.buildEmptyDataError())
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new ValidationError(this.buildError(errors));
    }
    return value;
  }

  private buildError(errors) {
    const result: ResponseError[] = [];
    errors.forEach(er =>{
      let prop = er.property;
      Object.entries(er.constraints).forEach(constraint=>{
          let currentError: ResponseError = {
            code: constraint[0],
            field: prop,
            message: `${constraint[1]}`
          }
          result.push(currentError);
      })
    })
    return result;
  }

  
  private buildEmptyDataError() {
    const result: ResponseError[] = [];
    let currentError: ResponseError = {
      code: ErrorCode.NO_DATA,
      field: "",
      message: ErrorMessage.NO_DATA
    }
    result.push(currentError);
    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}