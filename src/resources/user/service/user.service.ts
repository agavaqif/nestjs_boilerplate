import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable,from } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { User } from '../model/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ){}

    create(user: User): Observable<User> {
       return from(this.userRepository.save(user));
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
