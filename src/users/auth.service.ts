import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { UsersService } from "./users.service";
import User from "./user.entity";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)
@Injectable()
export default class AuthService {
    constructor(private _usersService:UsersService) {

    }
    async signin(email:string, password:string) {
        // check if the email is not already exists
        const [user] = await this._usersService.findUsers(email)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        // extract the salt
        const [salt, savedHashedPasswordSalt] = user.password.split('.')

        // hash the password and salt together (mypassworda1b7)
        const hashedPasswordSalt = (await scrypt(password, salt, 32) as Buffer).toString('hex')

        // compare saved hashed password with user password
        if (hashedPasswordSalt !== savedHashedPasswordSalt) {
            throw new UnprocessableEntityException('Incorrect email or password')
        }
        return user

    }

    async signup(email:string, password:string) {
        // check if the email is already exists
        const users = await this._usersService.findUsers(email)
        if (users.length) {
            throw new BadRequestException('Email is already exists')
        }
        // encrypt users's password

        // generate the salt (a1b7)
        const salt = randomBytes(8).toString('hex')
        // hash the password and salt together (mypassworda1b7)
        const hashedPasswordSalt = (await scrypt(password, salt, 32) as Buffer).toString('hex')
        // join the hashed result and the salt (a1b7.f8e7c12454d84545a5454548e4)
        const passwordToBeSaved = `${salt}.${hashedPasswordSalt}`
        // store the new user record in DB
        const createdUser = await this._usersService.createUser({
            email,
            password: passwordToBeSaved
        })
        return createdUser
        // Send back a cookie that contains users's id
        // return this._usersService.createUser(attrs)
    }
}