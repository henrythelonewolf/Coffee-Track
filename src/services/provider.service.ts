import { Injectable } from "@nestjs/common";
import { ProviderRepository } from "src/dal/repositories/provider.repository";
import { CreateCoffeeProviderResponseDto, CreateCoffeeProviderRequestDto } from "src/dto/provider/provider.dto";

@Injectable()
export class ProviderService {
  constructor(private providerRepository: ProviderRepository) {}

  async createCoffeeProvider(request: CreateCoffeeProviderRequestDto): Promise<CreateCoffeeProviderResponseDto> {
    const responseDto = await this.providerRepository.createCoffeeProvider(request);
    return responseDto;
  }
}