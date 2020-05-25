export class AccessTokenDto {
  constructor(init?: Partial<AccessTokenDto>) {
    Object.assign(this, init);
  }

  email: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
}