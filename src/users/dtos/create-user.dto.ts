import { IsEmail, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    email:string;
    @IsEmail()
    password:string
}