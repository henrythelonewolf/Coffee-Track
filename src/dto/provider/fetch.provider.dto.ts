import { BaseResponseDto } from "@dto/shared/base.dto";
import { CoffeeProvider } from "@schemas/provider.schema";

export class GetAllCoffeeProviderResponseDto extends BaseResponseDto {
  constructor(init?: Partial<GetAllCoffeeProviderResponseDto>) {
    super()
    Object.assign(this, init);
  }

  // #region service
  rawCoffeeProviders: CoffeeProvider[];
  // #endregion

  // #region controller
  coffeeProviders: CoffeeProviderDto[];
  // #endregion
}

export class CoffeeProviderDto {
  constructor(init?: Partial<CoffeeProviderDto>) {
    Object.assign(this, init);
  }
  
  name?: string;
  coffeeProviderId?: string;
}

export class GetAllCoffeeProviderResponse {
  constructor(init?: Partial<GetAllCoffeeProviderResponse>) {
    Object.assign(this, init);
  }

  coffeeProviders: CoffeeProviderDto[];
}