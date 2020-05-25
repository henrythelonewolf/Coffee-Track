import { CreateCoffeeProviderRequest, CreateCoffeeProviderRequestDto } from "@dto/provider/provider.dto";
import { AccessTokenDto } from "@dto/shared/access-token.dto";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ProviderService } from "@services/provider.service";
import { User } from "@shared/decorators/user.decorators";
import { AuthGuard } from "@shared/guards/auth.guard";

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