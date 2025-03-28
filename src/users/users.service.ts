import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private _userRepo:Repository<User>) {}

    createUser(attrs: Partial<User>) {
        const user = this._userRepo.create(attrs)
        return this._userRepo.save(user)
    }
    findUser(id:number) {
        if (!id) {
            throw new NotFoundException('User Not Found')
        }
        return this._userRepo.findOneBy({id})
    }

    findUsers(email:string) {
        return this._userRepo.find({where:{email}})
    }

    async updateUser(id:number, attrs:Partial<User>) {
        const user = await this.findUser(id)
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        const newUser = {...user, ...attrs}
        await this._userRepo.save(newUser)
        return {
            message: 'User has been updated successfully',
            user: await this.findUser(id)
        }
    }

    async removeUser(id:number) {
        const user = await this.findUser(id)
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        await this._userRepo.remove(user)
        return {
            message: 'User has been deleted successfully'
        }
    }
}
