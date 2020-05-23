import { ErrorResponseDto } from "src/shared/dto/error-response.dto";
import { User } from "src/dal/schemas/user.schema";

export class AuthenticationResponseDto {
  accessToken?: string;
  expiresIn?: number;
  user?: {
    email: string;
    role: string;
  };
  error?: ErrorResponseDto;
}