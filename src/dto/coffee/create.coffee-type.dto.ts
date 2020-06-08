import { ErrorResponseDto } from "@dto/shared/error-response.dto";
import { CoffeeType } from "@schemas/coffee-type.schema";

export class CreateCoffeeTypeRequest {
  constructor(init?: Partial<CreateCoffeeTypeRequest>) {
    Object.assign(this, init);
  }

  region?: string;
  remarks?: string;
}

export class CreateCoffeeTypeRequestDto {
  constructor(init?: Partial<CreateCoffeeTypeRequestDto>) {
    Object.assign(this, init);
  }

  region?: string;
  remarks?: string;
  userId?: string;
}

export class CreateCoffeeTypeResponseDto {
  constructor(init?: Partial<CreateCoffeeTypeResponseDto>) {
    Object.assign(this, init);
  }
  
  coffeeType?: CoffeeType;
  error?: ErrorResponseDto;
}

export class CreateCoffeeTypeResponse {
  constructor(init?: Partial<CreateCoffeeTypeResponse>) {
    Object.assign(this, init);
  }

  coffeeType?: CoffeeType;
}