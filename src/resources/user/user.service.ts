import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/shared/auth/service/auth.service';
import { getManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidationError } from 'src/pipes/validationpipes/validation.error';
import { buildErrorResponse, buildErrors } from 'src/shared/response/response.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {    
    const savedUser = await this.userRepository.save(this.userRepository.create(createUserDto));
    delete savedUser.password;
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options);
  }

  async findById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOneOrFail({id});
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({email});
    return user;
  }

  async update(id: number, user: UpdateUserDto): Promise<boolean> {
      await this.userRepository.findOneOrFail({id});
      await this.userRepository.update(id, this.userRepository.create(user));
      return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.userRepository.findOneOrFail({id});
    await this.userRepository.delete({id});
    return true;
  }

  async login(loginDto:LoginUserDto): Promise<User> {
    const user: User = await this.findByEmailWhole(loginDto.email);
    if(user) {
      console.log("User is ",user);
      console.log("Loginf dto", loginDto)
      let passwordMatch =await this.authService.comparePasswords(loginDto.password, user.password);
      if (!passwordMatch) throw new ValidationError(buildErrors("notFound","Password","Password Not found"));
      delete user.password;
      return user;
    }else {
      throw new ValidationError(buildErrors("notFound","Email","Email Not found"));
    }
  }

  async findByEmailWhole(email: string): Promise<User> {
    return this.userRepository.findOne({email}, {select: ['id', 'password', 'name', 'email', 'role']});
}

  

}
