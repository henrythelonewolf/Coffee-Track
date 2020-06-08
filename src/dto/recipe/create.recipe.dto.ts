import { BaseResponseDto } from "@dto/shared/base.dto";
import { Recipe } from "@schemas/recipe.schema";

export class CreateCoffeeRecipeRequestDto {
  constructor(init?: Partial<CreateCoffeeRecipeRequestDto>) {
    Object.assign(this, init);
  }

  coffeeId?: string;
  brewMethodId?: string;
  userId?: string;
  waterAmount?: number;
  coffeeAmount?: number;
  ratio?: number;
  rating?: number;
  tasteNotes?: string[];
  remarks?: string;
}

export class CreateCoffeeRecipeResponseDto extends BaseResponseDto {
  constructor(init?: Partial<CreateCoffeeRecipeResponseDto>) {
    super()
    Object.assign(this, init);
  }

  recipe?: Recipe;
}

export class CreateCoffeeRecipeRequest {
  constructor(init?: Partial<CreateCoffeeRecipeRequest>) {
    Object.assign(this, init);
  }

  coffeeId?: string;
  brewMethodId?: string;
  waterAmount?: number;
  coffeeAmount?: number;
  ratio?: number;
  rating?: number;
  tasteNotes?: string[];
  remarks?: string;
}

export class CreateCoffeeRecipeResponse {
  constructor(init?: Partial<CreateCoffeeRecipeResponse>) {
    Object.assign(this, init);
  }

  recipe?: Recipe;
}