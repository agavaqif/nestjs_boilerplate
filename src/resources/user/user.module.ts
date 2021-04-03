import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/shared/auth/auth.module';
import { IsUserAlreadyExist,CantUpdateEmail} from './user.validator';
import { UserSubscriber } from './entities/user.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService,UserSubscriber,IsUserAlreadyExist,CantUpdateEmail]
})
export class UserModule {}
