import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Roles } from 'src/shared/auth/decorators/role.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { RolesGuard } from 'src/shared/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/shared/auth/guards/jwt.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Get('paginate')
  index(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10
  ) {
    return this.userService.paginate({
      limit: Number(limit),
      page: Number(page)
  })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
