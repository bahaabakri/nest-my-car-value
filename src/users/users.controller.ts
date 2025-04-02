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
  Session,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import UpdateUserDto from './dtos/update-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import Serialize from 'src/_decorators/serialize.decorator';
import AuthService from './auth.service';
import { CurrentUser } from './_decorators/current-user.decorator';
import User from './user.entity';
import CurrentUserInterceptor from './_interceptors/current-user.interceptor';
import { AuthGuard } from 'src/_guards/auth.guard';
import { NotAuthGuard } from 'src/_guards/not-auth.guard';

@Controller('auth')
@Serialize(GetUserDto)
export class UsersController {
  constructor(private _usersService: UsersService, private _authService:AuthService) {}
  
  @UseGuards(NotAuthGuard)
  @Post('signup')
  async signup(@Body() body: CreateUserDto, @Session() session:any) {
    // console.log(body)
    const user = await this._authService.signup(body.email, body.password);
    session.userId = user.id
    return user;
  }
  
  @UseGuards(NotAuthGuard)
  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session:any) {
    // console.log(body)
    const user = await this._authService.signin(body.email, body.password);
    session.userId = user.id
    return user
  }

  @UseGuards(AuthGuard)
  @Post('signout')
  async signout(@Session() session:any) {
    session.userId = null
  }

  // @Get('me')
  // getCurrentUser(@Session() session:any) {
  //   // console.log(session.userId)
  //   return this._usersService.findUser(session.userId)
  // }
  @UseGuards(AuthGuard)
  @Get('me')
  getCurrentUser(@CurrentUser() user:User) {
    return user
    // return this._usersService.findUser(session.userId)
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findUser(@Param('id') id: string) {
    console.log('handling request');
    const user = await this._usersService.findUser(parseInt(id));
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
  @UseGuards(AuthGuard)
  @Get()
  findUsers(@Query('email') email: string) {
    return this._usersService.findUsers(email);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this._usersService.updateUser(parseInt(id), body);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this._usersService.removeUser(parseInt(id));
  }
}
