import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/shared/auth/auth.module';
import { CantUpdate, IsUserAlreadyExist } from './validator/user.validator.';
import { UserSubscriber } from './entities/user.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService,UserSubscriber,IsUserAlreadyExist,CantUpdate]
})
export class UserModule {}
