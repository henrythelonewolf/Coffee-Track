import { Controller, Post, Body, BadRequestException, HttpStatus, HttpCode, UseGuards } from "@nestjs/common";
import { CreateCoffeeProviderRequest, CreateCoffeeProviderRequestDto } from "src/dto/provider/provider.dto";
import { ProviderService } from "src/services/provider.service";
import { ErrorResponseDto } from "src/dto/shared/error-response.dto";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { User } from "src/shared/decorators/user.decorators";
import { AccessTokenDto } from "src/dto/shared/access-token.dto";

@Controller('provider')
export class ProviderController {
  constructor(private providerService: ProviderService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createProvider(@User() user: AccessTokenDto, @Body() request: CreateCoffeeProviderRequest): Promise<any> {
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
}