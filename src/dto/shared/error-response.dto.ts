export class ErrorResponseDto {
  constructor(init?: Partial<ErrorResponseDto>) {
    Object.assign(this, init);
  }
  code?: string;
  message?: string;
}