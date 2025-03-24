import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import UpdateUserDto from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private _usersService:UsersService) {}
    @Post('signup')
    createUser(@Body() body: CreateUserDto) {
        // console.log(body)
        return this._usersService.createUser(body)
    }

    @Get(':id')
    async findUser(@Param('id') id:string) {
        const user = await this._usersService.findUser(parseInt(id))
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user
    }
    @Get()
    findUsers(@Query('email') email:string) {
        return this._usersService.findUsers(email)
    }
    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() body: UpdateUserDto) {
        return this._usersService.updateUser(parseInt(id), body)
    }

    @Delete(':id')
    removeUser(@Param('id') id:string) {
        return this._usersService.removeUser(parseInt(id))
    }

}
