import { CreateCoffeeRecipeRequest, CreateCoffeeRecipeRequestDto, CreateCoffeeRecipeResponse } from '@dto/recipe/create.recipe.dto';
import { GetAllCoffeeRecipeRequestDto, GetAllCoffeeRecipeResponse } from '@dto/recipe/fetch.recipe.dto';
import { AccessTokenDto } from '@dto/shared/access-token.dto';
import { ErrorResponseDto } from '@dto/shared/error-response.dto';
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { RecipeService } from '@services/recipe.service';
import { User } from '@shared/decorators/user.decorators';
import { AuthGuard } from '@shared/guards/auth.guard';
import { extractErrorMessage } from '@shared/helper/error.helper';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createCoffeeRecipe(@User() user: AccessTokenDto, @Body() request: CreateCoffeeRecipeRequest): Promise<any> {
    try {
      const requestDto = new CreateCoffeeRecipeRequestDto({
        ...request,
        userId: user.userId
      });
      const responseDto = await this.recipeService.createCoffeeRecipe(requestDto);
      if (responseDto.hasError === true) {
        const error = responseDto.error;
        switch (error.code) {
          case 'CreateError':
            throw new BadRequestException(error);
          case 'InternalError':
          default:
            throw new InternalServerErrorException(error);
        }
      }

      const response = new CreateCoffeeRecipeResponse({
        recipe: responseDto.recipe
      });
      return response;
    } catch (error) {
      console.log(error);
      
      const msg = extractErrorMessage(error);
      throw new InternalServerErrorException(new ErrorResponseDto({
        code: 'InternalError',
        message: msg
      }));
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllCoffeeRecipes(@User() user: AccessTokenDto): Promise<any> {
    try {
      const requestDto = new GetAllCoffeeRecipeRequestDto({
        userId: user.userId
      });
      const responseDto = await this.recipeService.getAllCoffeeRecipes(requestDto);
      if (responseDto.hasError === true) {
        const error = responseDto.error;
        switch(error.code) {
          default:
            throw new InternalServerErrorException(error);
        }
      }

      const response = new GetAllCoffeeRecipeResponse({
        recipes: responseDto.recipes
      });
      return response;
    } catch (error) {
      console.log(error);
      const msg = extractErrorMessage(error);
      throw new InternalServerErrorException(new ErrorResponseDto({
        code: 'InternalError',
        message: msg
      }));
    }
  }
}
