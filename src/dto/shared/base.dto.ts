import { ErrorResponseDto } from "./error-response.dto";

export class BaseResponseDto {
  error?: ErrorResponseDto;
  get hasError(): boolean {
    return typeof this.error !== 'undefined';
  }
}