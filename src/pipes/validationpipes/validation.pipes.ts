
import {PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {ValidationError} from './validation.error'
import { ResponseError } from 'src/shared/response/response.entity';
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new ValidationError( this.buildEmptyDataError())
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new ValidationError(this.buildError(errors));
    }
    return value;
  }

  private buildError(errors) {
    console.log(errors)
    const result: ResponseError[] = [];
    errors.forEach(er =>{
      let prop = er.property;
      Object.entries(er.constraints).forEach(constraint=>{
        console.log(constraint)
          let currentError: ResponseError = {
            code: constraint[0],
            field: prop,
            message: `${constraint[1]}`
          }
          result.push(currentError);
      })
    })
    console.log("Result",result)
    return result;
  }

  
  private buildEmptyDataError() {
    const result: ResponseError[] = [];
    let currentError: ResponseError = {
      code: "noData",
      field: "",
      message: "No Data Submitted"
    }
    result.push(currentError);
    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}