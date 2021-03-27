import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
//import * as bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password,12));
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
        return from<boolean | any>(bcrypt.compare(newPassword, passwordHash))
    }
}
