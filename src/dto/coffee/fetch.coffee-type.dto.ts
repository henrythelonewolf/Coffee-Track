import { BaseResponseDto } from "@dto/shared/base.dto";
import { CoffeeType } from "@schemas/coffee-type.schema";

export class GetAllCoffeeTypeResponseDto extends BaseResponseDto {
  constructor(init?: Partial<GetAllCoffeeTypeResponseDto>) {
    super();
    Object.assign(this, init);
  }

  //#region service
  rawCoffeeTypes?: CoffeeType[];
  //#endregion

  //#region controller
  coffeeTypes?: CoffeeTypeDto[];
  //#endregion
}

export class GetAllCoffeeTypeResponse {
  constructor(init?: Partial<GetAllCoffeeTypeResponse>) {
    Object.assign(this, init);
  }

  coffeeTypes?: CoffeeTypeDto[];
}

export class CoffeeTypeDto {
  constructor(init?: Partial<CoffeeTypeDto>) {
    Object.assign(this, init);
  }

  coffeeTypeId?: string;
  region?: string;
  remarks?: string;
}