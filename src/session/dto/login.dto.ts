import { ErrorResponseDto } from "src/shared/dto/error-response.dto";

export class LoginResponseDto {
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

export class LoginRequestDto {
  user: {
    email: string;
    password: string;
  }
}