export class ErrorResponseDto {
  constructor(init?: Partial<ErrorResponseDto>) {
    Object.assign(this, init);
  }
  code?: 'InternalError' | 'FetchError' | 'CreateError' | 'UpdateError' | 'DeleteError' | 'ValidationError' | 'RefreshError';
  message?: string;
}