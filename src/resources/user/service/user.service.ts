import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable,from,throwError, of } from 'rxjs';
import { AuthService } from 'src/shared/auth/service/auth.service';
import {  Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { User, UserRole } from '../model/user.interface';
import { switchMap, map, catchError} from 'rxjs/operators';
import { returnAlert, returnResource } from 'src/shared/response/response.service';
import { ResponseObject } from 'src/shared/response/response.entity';
import { removeKey } from 'src/shared/utils/utils.service';
import { ClientMessages } from 'src/shared/constants/messages.contstants';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ){}

    // create(user: User): Observable<User> {
    //     return this.authService.hashPassword(user.password).pipe(
    //         switchMap((passwordHash: string) => {
    //             user.password = passwordHash;
    //             return from(this.userRepository.save(user)).pipe(
    //                 map((user: User) => {
    //                     const {password, ...result} = user;
    //                     return result;
    //                 }),
    //                 catchError(err => throwError(err))
    //             )
    //         })
    //     )
    // }


    // findAll(): Observable<User[]> {
    //     return from(this.userRepository.find());
    // }

    // findOne(id: number): Observable<User> {
    //     return from(this.userRepository.findOne({id:id}))
    // }

    

    // deleteOne(id:number): Observable<any> {
    //     return from(this.userRepository.delete(id));
    // }

    // update(id: number, user: User): Observable<any> {
    //     return from(this.userRepository.update(id, user));
    // }

    // login(user: User): Observable<any> {
    //     return this.validateUser(user.email, user.password).pipe(
    //         switchMap((match: boolean) => {
    //             if(match) {
    //                 const {password, ...result} = user;
    //                 return this.authService.generateJWT(result).pipe(map((jwt: string) => jwt));
    //             } else {
    //                 let obj: any= {
    //                     msg: "Wrong Passworf"
    //                 }
    //                 return of(obj);
    //             }
    //         })
    //     )
    // }

    // validateUser(email: string, password: string): Observable<boolean> {
    //     return this.findByEmail(email).pipe(
    //         switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
    //             map((match: boolean) => {
    //                 return match
    //             })
    //         ))
    //     )

    // }

    // findByEmail(email: string): Observable<User> {
    //     return from(this.userRepository.findOne({email}, {select: ['id', 'password', 'name', 'username', 'email', 'role', 'profileImage']}))
    // }

    async create(user: User): Promise<ResponseObject> {
        const hashedPassword: string =await this.authService.hashPassword(user.password);
        user.password = hashedPassword;
        const savedUser = await this.userRepository.save(user);
        return returnResource(removeKey(savedUser, "password")) ;
    }

    async findById(id: number): Promise<ResponseObject> {
        const user: User = await this.userRepository.findOneOrFail({id});
        return returnResource(user);
    }
    
    async findAll(): Promise<ResponseObject> {
        const users: User[] = await this.userRepository.find();
        return returnResource(users);
    }

    async updateById(id: number, user: User): Promise<ResponseObject> {
        await this.userRepository.findOneOrFail({id});
        await this.userRepository.update(id, user);
        return returnResource(true)
    }

    async deleteById(id: number): Promise<ResponseObject> {
        await this.userRepository.findOneOrFail({id});
        await this.userRepository.delete({id});
        return returnResource(true);
    }


    async loginAs(user: User): Promise<ResponseObject> {
        const result: ResponseObject =await this.validateUserAs(user.email, user.password);
        return result;
    }

    async validateUserAs(email: string, password: string) : Promise<ResponseObject> {
        const user: User = await this.findByEmailAs(email);
        if(!user){
            return returnAlert(ClientMessages.USER_NF)
        }
        let passwordMatch: boolean = await this.authService.comparePasswordsAs(password, user.password);
        return passwordMatch ? returnResource(removeKey(user,"password")) : returnAlert(ClientMessages.PASS_WR)
    }

    findByEmailAs(email: string): Promise<User> {
        return this.userRepository.findOne({email}, {select: ['id', 'password', 'name', 'email', 'role', 'profileImage']});
    }
}
