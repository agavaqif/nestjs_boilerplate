
import { Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'src/pipes/validationpipes/validation.error';
import { ResponseError, ResponseObject } from 'src/shared/response/response.entity';
import { extractKeyFromError } from 'src/shared/utils/utils.service';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        console.log(exception)
        console.log(exception instanceof EntityNotFoundError)
        if(exception instanceof EntityNotFoundError) {
          return this.handleEntityNotFound(exception,response);
        }
        if('code' in exception && exception.code == 23505) {
          return this.handleUniqueConstraint(exception,response);
        }
        else if(exception instanceof ValidationError) {
          return this.handleValidationErrors(exception, response);
        }
        else{
          return this.handleServerErrors(exception, response);
        }
      }
    
    handleEntityNotFound(exception: any, response: any) {
        let errors = [];
        let currentError:ResponseError = {
          code: "notFound",
          field: '',
          message: 'Resource was not found'
        }
        errors.push(currentError);
        let  responseObject:ResponseObject = new ResponseObject(false,{},errors);
        return response.status(HttpStatus.CONFLICT).json(responseObject);
    }

    handleUniqueConstraint(exception: any, response: any) {
        let field = extractKeyFromError(exception.detail)
        let errors = [];
        let currentError:ResponseError = {
          code: "notUnique",
          field: field,
          message: field + ' is not unique'
        }
        errors.push(currentError);
        let  responseObject:ResponseObject = new ResponseObject(false,{},errors);
        return response.status(HttpStatus.CONFLICT).json(responseObject);
    }  

    handleServerErrors(exception: any, response: any) {
      let errors = [];
        let currentError:ResponseError = {
          code: "serverError",
          field: '',
          message: 'ServerError'
        }
        errors.push(currentError);
        let  responseObject:ResponseObject = new ResponseObject(false,{},errors);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObject);
    }

    handleValidationErrors(exception: ValidationError, response:any){
      let  responseObject:ResponseObject = new ResponseObject(false,{}, exception.getErrors());
      return response.status(exception.getStatus()).json(responseObject)
    }
}

