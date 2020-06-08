import { Injectable } from "@nestjs/common"
import * as mongoose from 'mongoose';
import { Model } from "mongoose";
import { Recipe } from "@schemas/recipe.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCoffeeRecipeRequestDto, CreateCoffeeRecipeResponseDto } from "@dto/recipe/create.recipe.dto";
import { extractErrorMessage } from "@shared/helper/error.helper";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";
import { GetAllCoffeeRecipeRequestDto, GetAllCoffeeRecipeResponseDto } from "@dto/recipe/fetch.recipe.dto";
import { Coffee } from "@schemas/coffee.schema";
import { Brew } from "@schemas/brew.schema";

@Injectable()
export class RecipeRepository {
  constructor(@InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>) {}

  async createRecipe(request: CreateCoffeeRecipeRequestDto): Promise<CreateCoffeeRecipeResponseDto> {
    try {
      console.log(request);
      const coffeeRecipe = new this.recipeModel({
        coffee: mongoose.Types.ObjectId(request.coffeeId),
        brewMethod: mongoose.Types.ObjectId(request.brewMethodId),
        coffeeAmount: request.coffeeAmount,
        waterAmount: request.waterAmount,
        ratio: request.ratio,
        rating: request.rating,
        tasteNotes: request.tasteNotes,
        remarks: request.remarks,
        createdBy: mongoose.Types.ObjectId(request.userId),
        updatedBy: mongoose.Types.ObjectId(request.userId)
      });
      await coffeeRecipe.save();
      console.log(coffeeRecipe);

      const response = new CreateCoffeeRecipeResponseDto({
        recipe: coffeeRecipe
      });
      return response;
    } catch (error) {
      console.log(error);

      const msg = extractErrorMessage(error);
      const response = new CreateCoffeeRecipeResponseDto({
        error: new ErrorResponseDto({
          code: 'CreateError',
          message: msg
        })
      });
      return response;
    }
  }

  async getAllRecipes(request: GetAllCoffeeRecipeRequestDto): Promise<GetAllCoffeeRecipeResponseDto> {
    try {
      const recipes = await this.recipeModel.find({createdBy: request.userId})
        .populate({
          path: 'coffee', 
          populate: [
            'coffeeType',
            'provider'
          ]
        })
        .populate('brewMethod')
        .exec();
        
      console.log(recipes);
      const response = new GetAllCoffeeRecipeResponseDto({
        rawRecipes: recipes
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