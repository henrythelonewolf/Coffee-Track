import { Injectable } from "@nestjs/common"
import { RecipeRepository } from "@repositories/recipe.repository";
import { CreateCoffeeRecipeRequestDto, CreateCoffeeRecipeResponseDto } from "@dto/recipe/create.recipe.dto";
import { GetAllCoffeeRequestDto, CoffeeDto } from "@dto/coffee/fetch.coffee.dto";
import { GetAllCoffeeRecipeRequestDto, GetAllCoffeeRecipeResponseDto, CoffeeRecipeDto } from "@dto/recipe/fetch.recipe.dto";
import { Coffee } from "@schemas/coffee.schema";
import { CoffeeType } from "@schemas/coffee-type.schema";
import { CoffeeTypeDto } from "@dto/coffee/fetch.coffee-type.dto";
import { CoffeeProviderDto } from "@dto/provider/fetch.provider.dto";
import { CoffeeProvider } from "@schemas/provider.schema";
import { BrewMethodDto } from "@dto/brew/fetch.brew.dto";
import { Brew } from "@schemas/brew.schema";
import { extractErrorMessage } from "@shared/helper/error.helper";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";

@Injectable()
export class RecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  async createCoffeeRecipe(request: CreateCoffeeRecipeRequestDto): Promise<CreateCoffeeRecipeResponseDto> {
    const responseDto = await this.recipeRepository.createRecipe(request);
    return responseDto;
  }

  async getAllCoffeeRecipes(request: GetAllCoffeeRecipeRequestDto): Promise<GetAllCoffeeRecipeResponseDto> {
    try {
      const responseDto = await this.recipeRepository.getAllRecipes(request);
      if (responseDto.hasError === true) {
        return responseDto;
      }

      const response = new GetAllCoffeeRecipeResponseDto({
        recipes: responseDto.rawRecipes.map(x => new CoffeeRecipeDto({
          coffee: new CoffeeDto({
            coffeeId: (x.coffee as Coffee)._id,
            coffeeType: new CoffeeTypeDto({
              coffeeTypeId: ((x.coffee as Coffee).coffeeType as CoffeeType)._id,
              region: ((x.coffee as Coffee).coffeeType as CoffeeType).region,
              remarks: ((x.coffee as Coffee).coffeeType as CoffeeType).remarks
            }),
            coffeeProvider: new CoffeeProviderDto({
              coffeeProviderId: ((x.coffee as Coffee).provider as CoffeeProvider)._id,
              name: ((x.coffee as Coffee).provider as CoffeeProvider).name,
            }),
            boughtDate: (x.coffee as Coffee).boughtDate.toISOString(),
            roastDate: (x.coffee as Coffee).roastDate.toISOString(),
            weight: (x.coffee as Coffee).weight
          }),
          brewMethod: new BrewMethodDto({
            brewMethodId: (x.brewMethod as Brew)._id,
            name: (x.brewMethod as Brew).name,
            description: (x.brewMethod as Brew).description
          }),
          waterAmount: x.waterAmount,
          coffeeAmount: x.coffeeAmount,
          ratio: x.ratio,
          rating: x.rating,
          tasteNotes: x.tasteNotes,
          remarks: x.remarks
        }))
      });

      return response;
    } catch (error) {
      console.log(error);
      const msg = extractErrorMessage(error);
      
      const response = new GetAllCoffeeRecipeResponseDto({
        error: new ErrorResponseDto({
          code: 'FetchError',
          message: msg
        })
      });
      return response;
    }
  }
}