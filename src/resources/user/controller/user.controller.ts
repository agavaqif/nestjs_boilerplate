import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseObject } from 'src/shared/response/response.entity';
import { User } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    // @Post()
    // create(@Body() user:User) : Observable<User> {
    //     return this.userService.create(user);
    // }

    // @Get()
    // findAll() : Observable<User[]> {
    //     return this.userService.findAll();
    // }

    // @Get(":id")
    // findOne(@Param() params) : Observable<User> {
    //     return this.userService.findOne(params.id)
    // }

    // @Delete(':id')
    // deleteOne(@Param() params) : Observable<any> {
    //     return this.userService.deleteOne(params.id)
    // }

    // @Put(':id')
    // updateOne(@Param() params, @Body() user:User) : Observable<any> {
    //     return this.userService.update(params.id, user);
    // }

    // @Post('login')
    // login(@Body() user:User) : Observable<string> {
    //     result:Object;
    //     this.userService.login(user).subscribe(result=>{
    //         console.log("Result is",result)
    //     })
    //     return this.userService.login(user);
    // }

    @Post()
    create(@Body() user:User) : Promise<ResponseObject> {
        return this.userService.create(user);
    }

    @Get(":id")
    findById(@Param() params) : Promise<ResponseObject> {
         return this.userService.findById(params.id)
     }

     @Get()
     findAll(): Promise<ResponseObject> {
         return this.userService.findAll();
     }

     @Put(':id')
     updateById(@Param() params, @Body() user: User): Promise<ResponseObject> {
         return this.userService.updateById(params.id, user);
     }

     @Delete(':id')
     deleteById(@Param() params): Promise<ResponseObject> {
         return this.userService.deleteById(params.id)
     }

    @Post('login')
    login(@Body() user:User) {
        return this.userService.loginAs(user)
    }

}
