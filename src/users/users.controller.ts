import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import UpdateUserDto from './dtos/update-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import Serialize from 'src/_decorators/serialize.decorator';
import AuthService from './auth.service';

@Controller('auth')
@Serialize(GetUserDto)
export class UsersController {
  constructor(private _usersService: UsersService, private _authService:AuthService) {}
  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    // console.log(body)
    return this._authService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: CreateUserDto) {
    // console.log(body)
    return this._authService.signin(body.email, body.password);
  }
  @Get(':id')
  async findUser(@Param('id') id: string) {
    console.log('handling request');
    const user = await this._usersService.findUser(parseInt(id));
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
  @Get()
  findUsers(@Query('email') email: string) {
    return this._usersService.findUsers(email);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this._usersService.updateUser(parseInt(id), body);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this._usersService.removeUser(parseInt(id));
  }
}
