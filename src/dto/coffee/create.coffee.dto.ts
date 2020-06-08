import { BaseResponseDto } from "@dto/shared/base.dto";
import { Coffee } from "@schemas/coffee.schema";

export class CreateCoffeeRequestDto {
  constructor(init?: Partial<CreateCoffeeRequestDto>) {
    Object.assign(this, init);
  }

  coffeeProviderId?: string;
  coffeeTypeId?: string;
  userId?: string;
  // #region service
  boughtDateStr?: string;
  roastDateStr?: string;
  // #endregion
  // #region repository
  boughtDate?: Date;
  roastDate?: Date;
  // #endregion
  weight?: number;
}

export class CreateCoffeeResponseDto extends BaseResponseDto {
  constructor(init?: Partial<CreateCoffeeResponseDto>) {
    super()
    Object.assign(this, init);
  }

  coffee?: Coffee;
}

export class CreateCoffeeRequest {
  constructor(init?: Partial<CreateCoffeeRequest>) {
    Object.assign(this, init);
  }

  boughtDate?: string;
  roastDate?: string;
  coffeeProviderId?: string;
  coffeeTypeId?: string;
  userId?: string;
  weight?: number;
}

export class CreateCoffeeResponse {
  constructor(init?: Partial<CreateCoffeeResponse>) {
    Object.assign(this, init);
  }

  coffee?: Coffee;
}