import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { validateAccessToken } from "../helper/auth.helper";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateAccessToken(request);
  }
}