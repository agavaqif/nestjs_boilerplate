import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/shared/auth/auth.module';
import { IsUserAlreadyExist } from './user.validator';
import { getFromContainer, Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService,IsUserAlreadyExist]
})
export class UserModule {}
