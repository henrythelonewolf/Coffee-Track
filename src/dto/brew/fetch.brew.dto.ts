import { BaseResponseDto } from "@dto/shared/base.dto";
import { Brew } from "@schemas/brew.schema";

export class GetAllBrewMethodsResponseDto extends BaseResponseDto {
  constructor(init?: Partial<GetAllBrewMethodsResponseDto>) {
    super();
    Object.assign(this, init);
  }

  //#region controller 
  brewMethods?: BrewMethodDto[];
  //#endregion

  //#region service
  rawBrewMethods?: Brew[];
  //#endregion
}

export class GetAllBrewMethodsResponse {
  constructor(init?: Partial<GetAllBrewMethodsResponse>) {
    Object.assign(this, init);
  }

  brewMethods?: BrewMethodDto[];
}

export class BrewMethodDto {
  constructor(init?: Partial<BrewMethodDto>) {
    Object.assign(this, init);
  }

  brewMethodId: string;
  name: string;
  description?: string;
}