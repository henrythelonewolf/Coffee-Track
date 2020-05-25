import { ErrorResponseDto } from "../shared/error-response.dto";

export class RefreshRequestDto {
  constructor(init?: Partial<RefreshRequestDto>) {
    Object.assign(this, init);
  }

  refreshToken: string;
}

export class RefreshResponseDto {
  constructor(init?: Partial<RefreshResponseDto>) {
    Object.assign(this, init);
  }

  user?: {
    email: string;
    role: string;
  };
  access?: {
    accessToken: string;
    expiresIn: number;
  };
  refresh?: {
    refreshToken: string;
    expiresIn: number;
  };
  error?: ErrorResponseDto;
}