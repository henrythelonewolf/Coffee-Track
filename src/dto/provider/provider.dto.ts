import { ErrorResponseDto } from "../shared/error-response.dto";

export class CreateCoffeeProviderRequest {
  name: string;
  lat?: number;
  long?: number;
}

export class CreateCoffeeProviderRequestDto {
  constructor(init?: Partial<CreateCoffeeProviderRequestDto>) {
    Object.assign(this, init);
  }
  
  name: string;
  lat?: number;
  long?: number;
  userId: string;
}

export class CreateCoffeeProviderResponseDto {
  constructor(init?: Partial<CreateCoffeeProviderResponseDto>) {
    Object.assign(this, init);
  }
  error?: ErrorResponseDto
}