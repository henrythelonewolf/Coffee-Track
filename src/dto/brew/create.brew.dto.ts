import { Brew } from "@schemas/brew.schema";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";
import { BaseResponseDto } from "@dto/shared/base.dto";

export class CreateBrewMethodRequest {
  constructor(init?: Partial<CreateBrewMethodRequest>) {
    Object.assign(this, init);
  }

  name?: string;
  description?: string;
}

export class CreateBrewMethodResponse {
  constructor(init?: Partial<CreateBrewMethodResponse>) {
    Object.assign(this, init);
  }

  brewMethod: Brew
}

export class CreateBrewMethodRequestDto {
  constructor(init?: Partial<CreateBrewMethodRequestDto>) {
    Object.assign(this, init);
  }

  name?: string;
  description?: string;
  userId?: string;
}

export class CreateBrewMethodResponseDto extends BaseResponseDto {
  constructor(init?: Partial<CreateBrewMethodResponseDto>) {
    super();
    Object.assign(this, init);
  }

  brewMethod?: Brew;
}