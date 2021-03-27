import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { AuthService } from './service/auth.service';

console.log(configService.getJWTSecret())
@Module({
  imports: [
    JwtModule.register({
      secret: configService.getJWTSecret(),
      signOptions: { expiresIn: '60s'}
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
