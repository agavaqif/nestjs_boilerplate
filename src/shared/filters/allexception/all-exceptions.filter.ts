
import { Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ResponseType } from 'src/shared/response/response.entity';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        return response.status(status).json({
          statusCode: status,
          payload: 'Server Error',
          type: ResponseType.ERROR,
        });
      }
}
