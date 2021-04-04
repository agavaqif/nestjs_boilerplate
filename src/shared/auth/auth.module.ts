import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { AuthService } from './service/auth.service';
import {JwtStrategy } from './guards/jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: configService.getJWTSecret(),
      signOptions: { expiresIn: '60s'}
    })
  ],
  providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
