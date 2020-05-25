import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';
import { refreshSecretKey } from "../configs/tokens.config";

export const Cookie = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const refreshToken = request.signedCookies['jwt-refresh-token'];
    if (typeof refreshToken === 'undefined') {
      return '';
    }

    try {
      jwt.verify(refreshToken, refreshSecretKey);
      return refreshToken;
    } catch (exception) {
      console.log('refresh token invalid');
      return '';
    }
  }
);