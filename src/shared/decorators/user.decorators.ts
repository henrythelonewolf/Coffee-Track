import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { extractToken } from "../helper/auth.helper";
import * as jwt from 'jsonwebtoken';
import { AccessTokenDto } from "src/dto/shared/access-token.dto";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AccessTokenDto => {
    const request = ctx.switchToHttp().getRequest();
    const token = extractToken(request);
    const decoded: any = jwt.decode(token);
    const response = new AccessTokenDto({
      email: decoded.email,
      userId: decoded.userId,
      role: decoded.role,
      iat: decoded.iat,
      exp: decoded.exp
    });
    return response;
  }
)