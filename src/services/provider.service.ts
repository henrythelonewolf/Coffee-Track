import { Injectable } from "@nestjs/common";
import { ProviderRepository } from "@repositories/provider.repository";
import { CreateCoffeeProviderResponseDto, CreateCoffeeProviderRequestDto } from "@dto/provider/provider.dto";
import { GetAllCoffeeProviderResponseDto, CoffeeProviderDto } from "@dto/provider/fetch.provider.dto";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";

@Injectable()
export class ProviderService {
  constructor(private providerRepository: ProviderRepository) {}

  async createCoffeeProvider(request: CreateCoffeeProviderRequestDto): Promise<CreateCoffeeProviderResponseDto> {
    const responseDto = await this.providerRepository.createCoffeeProvider(request);
    return responseDto;
  }

  async getAllCoffeeProviders(): Promise<GetAllCoffeeProviderResponseDto> {
    try {
      const response = await this.providerRepository.getAllCoffeeProviders();
      if (response.hasError === true) {
        return response;
      }

      const responseDto = new GetAllCoffeeProviderResponseDto({
        coffeeProviders: response.rawCoffeeProviders.map(x => new CoffeeProviderDto({
          coffeeProviderId: x._id,
          name: x.name
        }))
      });

      return responseDto;
    } catch (error) {
      console.log(error);
      
      const responseDto = new GetAllCoffeeProviderResponseDto({
        error: new ErrorResponseDto({
          code: 'InternalError',
          message: 'An unexpected error occured.'
        })
      });
      return responseDto;
    }
  }
}