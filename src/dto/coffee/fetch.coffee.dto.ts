import { BaseResponseDto } from "@dto/shared/base.dto";
import { Coffee } from "@schemas/coffee.schema";
import { CoffeeTypeDto } from "./fetch.coffee-type.dto";
import { CoffeeProviderDto } from "@dto/provider/fetch.provider.dto";

export class GetAllCoffeeRequestDto {
  constructor(init?: Partial<GetAllCoffeeRequestDto>) {
    Object.assign(this, init);
  }

  userId?: string;
}

export class GetAllCoffeeResponseDto extends BaseResponseDto {
  constructor(init?: Partial<GetAllCoffeeResponseDto>) {
    super()
    Object.assign(this, init);
  }
  
  rawCoffee?: Coffee[];
  coffee?: CoffeeDto[];
}

export class GetAllCoffeeResponse {
  constructor(init?: Partial<GetAllCoffeeResponse>) {
    Object.assign(this, init);
  }

  coffee?: CoffeeDto[];
}

export class CoffeeDto {
  constructor(init?: Partial<CoffeeDto>) {
    Object.assign(this, init);
  }

  coffeeId?: string;
  coffeeType?: CoffeeTypeDto;
  coffeeProvider?: CoffeeProviderDto;
  boughtDate?: string;
  roastDate?: string;
  weight?: number;
}