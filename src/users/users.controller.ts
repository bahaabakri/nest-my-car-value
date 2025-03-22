import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post('signup')
    createUser(@Body() body: CreateUserDto) {

    }

    @Get(':id')
    findUser(@Param('id') id:string) {

    }
    @Patch(':id')
    updateUser(@Body() body: CreateUserDto, @Param('id') id:string) {
        
    }

    @Delete(':id')
    removeUser(@Param('id') id:string) {
        
    }

}
