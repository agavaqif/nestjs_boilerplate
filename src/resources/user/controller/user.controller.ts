import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:userId')
  findById(@Param('userId') userId: number) {
    return this.userService.findById(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete('/:userId')
  remove(@Param('userId') userId: number) {
    return this.userService.remove(userId);
  }

  @Post('login')
  login(@Body() loginUserDto : LoginUserDto){
    return this.userService.login(loginUserDto);
  }
}
