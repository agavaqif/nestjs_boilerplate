import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/shared/auth/service/auth.service';
import { getManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {    
    const savedUser = await this.userRepository.save(this.userRepository.create(createUserDto));
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
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

}
