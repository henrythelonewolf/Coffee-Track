import { CreateCoffeeProviderRequest, CreateCoffeeProviderRequestDto } from "@dto/provider/provider.dto";
import { AccessTokenDto } from "@dto/shared/access-token.dto";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get, InternalServerErrorException } from "@nestjs/common";
import { ProviderService } from "@services/provider.service";
import { User } from "@shared/decorators/user.decorators";
import { AuthGuard } from "@shared/guards/auth.guard";
import { GetAllCoffeeProviderResponse } from "@dto/provider/fetch.provider.dto";

@Controller('provider')
export class ProviderController {
  constructor(private providerService: ProviderService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createProvider(@User() user: AccessTokenDto, @Body() request: CreateCoffeeProviderRequest): Promise<any> {
    if (typeof request.name === 'undefined' || request.name.length === 0) {
      throw new BadRequestException(new ErrorResponseDto({
        code: 'ValidationError',
        message: 'Name is required.'
      }));
    }

    const requestDto = new CreateCoffeeProviderRequestDto({
      name: request.name,
      lat: request.lat,
      long: request.long,
      userId: user.userId
    });
    
    const responseDto = await this.providerService.createCoffeeProvider(requestDto);
    if (typeof responseDto.error !== 'undefined') {
      throw new BadRequestException(new ErrorResponseDto({
        code: 'CreateError',
        message: 'An error occurred during creation.'
      }));
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllProviders(@User() user: AccessTokenDto): Promise<GetAllCoffeeProviderResponse> {
    try {
      const responseDto = await this.providerService.getAllCoffeeProviders();
      if (responseDto.hasError === true) {
        throw new InternalServerErrorException(responseDto.error);
      }

      const response = new GetAllCoffeeProviderResponse({
        coffeeProviders: responseDto.coffeeProviders
      });
      return response;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(new ErrorResponseDto({
        code: 'InternalError',
        message: 'An unexpected error occured.'
      }));
    }
  }
}