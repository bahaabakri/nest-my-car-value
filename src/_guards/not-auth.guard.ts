import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class NotAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return !request.session.userId
    }
}