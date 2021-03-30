import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/allexception/all-exceptions.filter';
import { CustomValidationPipe } from './pipes/validationpipes/validation.pipes';
import {useContainer} from 'class-validator';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter }  = app.get(HttpAdapterHost);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor())

  await app.listen(3000);
}

bootstrap();
