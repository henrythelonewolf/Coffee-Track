import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { accessSecretKey } from '../configs/tokens.config';
export const extractToken = (req: Request) => req.headers['authorization']?.split(' ')[1] || '';

export const validateAccessToken = (request: Request): boolean => {
  const token = extractToken(request);
  if (token.length === 0) {
    return false;
  }

  try {
    const verified = jwt.verify(token, accessSecretKey);
    return true;
  } catch (exception) {
    console.log(exception);
    return false;
  }
}