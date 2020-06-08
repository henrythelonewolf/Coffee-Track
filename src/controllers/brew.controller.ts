import { Controller, Post, HttpCode, HttpStatus, UseGuards, Body, BadRequestException, InternalServerErrorException, Get } from "@nestjs/common";
import { AuthGuard } from "@shared/guards/auth.guard";
import { User } from "@shared/decorators/user.decorators";
import { CreateBrewMethodRequest, CreateBrewMethodRequestDto, CreateBrewMethodResponse } from "@dto/brew/create.brew.dto";
import { AccessTokenDto } from "@dto/shared/access-token.dto";
import { BrewService } from "@services/brew.service";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";

@Controller('brew')
export class BrewController {
  constructor(private brewService: BrewService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllBrewMethods(): Promise<any> {
    try {
      const responseDto = await this.brewService.getAllBrewMethods();
      if (responseDto.hasError === true) {
        throw new BadRequestException(responseDto.error);
      }

      return responseDto;
    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException(new ErrorResponseDto({
        code: 'FetchError',
        message: 'An exception occurred.'
      }));
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createBrewMethod(@User() user: AccessTokenDto, @Body() request: CreateBrewMethodRequest): Promise<CreateBrewMethodResponse> {
    const requestDto: CreateBrewMethodRequestDto = {
      name: request.name,
      description: request.description,
      userId: user.userId
    };

    try {
      const responseDto = await this.brewService.createBrewMethod(requestDto);

      if (responseDto.hasError === true) {
        throw new BadRequestException({
          error: {
            message: 'create brew method failed!'
          }
        });
      }
  
      const response = new CreateBrewMethodResponse({
        brewMethod: responseDto.brewMethod
      });
  
      return response;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        error: {
          message: 'server exception'
        }
      });
    }
  }
}