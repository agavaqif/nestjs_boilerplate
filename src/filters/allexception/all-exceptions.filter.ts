
import { Catch, ArgumentsHost, HttpStatus, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ErrorCode, ErrorMessage } from 'src/enums/error-codes.enum';
import { ValidationError } from 'src/shared/response/validation-error.class';
import { ResponseObject } from 'src/shared/response/response.class';
import { buildErrorResponse } from 'src/shared/response/response.service';
import { extractKeyFromError } from 'src/shared/utils/object-functions.util';
import { EntityNotFoundError } from 'typeorm';

/**
 * Carch and handle different types of exceptions.
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if(exception instanceof NotFoundException) {
          return this.handleNotFound(exception,response);
        }
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
    handleNotFound(exception: any, response: any) {
      return response.status(HttpStatus.CONFLICT).json(buildErrorResponse(ErrorCode.NOT_FOUND,'',exception.message));
    }
    handleEntityNotFound(exception: any, response: any) {
        return response.status(HttpStatus.CONFLICT).json(buildErrorResponse(ErrorCode.NOT_FOUND,'',ErrorMessage.NOT_FOUND));
    }

    handleUniqueConstraint(exception: any, response: any) {
        let field = extractKeyFromError(exception.detail)
        return response.status(HttpStatus.CONFLICT).json(buildErrorResponse(ErrorCode.NOT_UNIQUE,field,`${field} ${ErrorMessage.NOT_UNIQUE}`));
    }  

    handleServerErrors(exception: any, response: any) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(buildErrorResponse(ErrorCode.SERVER_ERROR,'',ErrorMessage.SERVER_ERROR));
    }

    handleValidationErrors(exception: ValidationError, response:any){
      let  responseObject:ResponseObject = new ResponseObject(false,{}, exception.getErrors());
      return response.status(exception.getStatus()).json(responseObject)
    }
}

