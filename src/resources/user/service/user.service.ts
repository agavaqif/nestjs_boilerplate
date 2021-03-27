import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable,from,throwError } from 'rxjs';
import { AuthService } from 'src/shared/auth/service/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { User, UserRole } from '../model/user.interface';
import { switchMap, map, catchError} from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ){}

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                user.password = passwordHash;
                return from(this.userRepository.save(user)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find());
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({id:id}))
    }

    deleteOne(id:number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    update(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }
}
