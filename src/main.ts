import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/allexception/all-exceptions.filter';
import { CustomValidationPipe } from './pipes/validationpipes/validation.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter }  = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.useGlobalPipes(new CustomValidationPipe());

  await app.listen(3000);
}

bootstrap();
