import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export default class CurrentUserInterceptor implements NestInterceptor {

    constructor(private _usersService: UsersService) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const {userId } = request.session || {}
        if (userId) {
            const user = await this._usersService.findUser(userId)
            if (user) {
                request.currentUser = user
            }
        }
        return next.handle()
    }
}