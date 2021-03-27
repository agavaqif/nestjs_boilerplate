import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
