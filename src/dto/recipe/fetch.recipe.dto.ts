import { BaseResponseDto } from "@dto/shared/base.dto";
import { Recipe } from "@schemas/recipe.schema";
import { CoffeeDto } from "@dto/coffee/fetch.coffee.dto";
import { BrewMethodDto } from "@dto/brew/fetch.brew.dto";

export class GetAllCoffeeRecipeResponse {
  constructor(init?: Partial<GetAllCoffeeRecipeResponse>) {
    Object.assign(this, init);
  }

  recipes?: CoffeeRecipeDto[];
}

export class GetAllCoffeeRecipeRequestDto {
  constructor(init?: Partial<GetAllCoffeeRecipeRequestDto>) {
    Object.assign(this, init);
  }

  userId?: string;
}

export class GetAllCoffeeRecipeResponseDto extends BaseResponseDto {
  constructor(init?: Partial<GetAllCoffeeRecipeResponseDto>) {
    super()
    Object.assign(this, init);
  }

  rawRecipes: Recipe[];
  recipes: CoffeeRecipeDto[];
}

export class CoffeeRecipeDto {
  constructor(init?: Partial<CoffeeRecipeDto>) {
    Object.assign(this, init);
  }

  coffee?: CoffeeDto;
  waterAmount?: number;
  coffeeAmount?: number;
  ratio?: number;
  brewMethod?: BrewMethodDto;
  rating?: number;
  tasteNotes?: string[];
  remarks?: string;
}