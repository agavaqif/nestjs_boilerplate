import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { User } from 'src/resources/user/model/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    // generateJWT(user: User): Observable <string> {
    //     return from(this.jwtService.signAsync({user}));
    // }

    // hashPassword(password: string): Observable<string> {
    //     return from<string>(bcrypt.hash(password,12));
    // }

    // comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
    //     return from<boolean | any>(bcrypt.compare(newPassword, passwordHash))
    // }

    generateJWT(user: User): Promise <string> {
        return this.jwtService.signAsync({user});
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password,12);
    }

    comparePasswordsAs(newPassword: string, passwordHash: string): Promise<any> {
        return bcrypt.compare(newPassword,passwordHash )
    }
}
