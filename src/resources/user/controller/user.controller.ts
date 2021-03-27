import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body() user:User) : Observable<User> {
        return this.userService.create(user);
    }

    @Get()
    findAll() : Observable<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param() params) : Observable<User> {
        return this.userService.findOne(params.id)
    }

    @Delete(':id')
    deleteOne(@Param() params) : Observable<any> {
        return this.userService.deleteOne(params.id)
    }

    @Post(':id')
    updateOne(@Param() params, @Body() user:User) : Observable<any> {
        console.log("User is ",user)
        return this.userService.update(params.id, user);
    }

}
