import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/resources/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    generateJWT(user: User): Promise <string> {
        return this.jwtService.signAsync({user});
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password,12);
    }

    comparePasswords(newPassword: string, passwordHash: string): Promise<any> {
        return bcrypt.compare(newPassword,passwordHash )
    }

}
