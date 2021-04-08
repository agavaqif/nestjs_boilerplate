import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode, ErrorMessage } from 'src/enums/error-code.enum';
import { AuthService } from 'src/shared/auth/service/auth.service';
import { buildErrors } from 'src/shared/response/response.service';
import { ValidationError } from 'src/shared/response/validation-error.class';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService
  ){}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto)
    const user: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  public async findById(userId: number): Promise<User> {
    const user: User = await this.userRepository.findOneOrFail(userId);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({email});
    return user;
  }

  public async update(userId: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.findOneOrFail(userId);
    const user: User = this.userRepository.create(updateUserDto);
    await this.userRepository.update(userId, user);
    return true;
  }

  public async remove(userId: number): Promise<boolean> {
    const user: User = await this.userRepository.findOneOrFail(userId);
    await this.userRepository.remove(user);
    return true;
  }

  public async login(loginDto:LoginUserDto): Promise<string> {
    const user: User = await this.findByEmailWhole(loginDto.email);
    if(user) {
      let passwordMatch =await this.authService.comparePasswords(loginDto.password, user.password);
      if (!passwordMatch) throw new ValidationError(buildErrors(ErrorCode.IS_WRONG,"Password",ErrorMessage.PASSWORD_WRONG));
      delete user.password;
      return this.authService.generateJWT(user);
    }else {
      throw new ValidationError(buildErrors(ErrorCode.NOT_FOUND,"Email",ErrorMessage.EMAIL_NOT_FOUND));
    }
  }

  public async findByEmailWhole(email: string): Promise<User> {
    return this.userRepository.findOne({email}, {select: ['userId', 'password', 'name', 'email', 'role']});
  }

}
