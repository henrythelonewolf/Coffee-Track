import { CreateBrewMethodRequestDto, CreateBrewMethodResponseDto } from "@dto/brew/create.brew.dto";
import { BrewMethodDto, GetAllBrewMethodsResponseDto } from "@dto/brew/fetch.brew.dto";
import { Injectable } from "@nestjs/common";
import { BrewRepository } from "@repositories/brew.repository";

@Injectable()
export class BrewService {
  constructor(private brewRepository: BrewRepository) {}

  async createBrewMethod(request: CreateBrewMethodRequestDto): Promise<CreateBrewMethodResponseDto> {
    const response = await this.brewRepository.createBrewMethod(request);
    return response;
  }

  async getAllBrewMethods(): Promise<GetAllBrewMethodsResponseDto> {
    const response = await this.brewRepository.getAllBrewMethods();
    if (typeof response.error !== 'undefined') {
      return response;
    }

    const responseDto = new GetAllBrewMethodsResponseDto({
      brewMethods: response.rawBrewMethods.map(x => new BrewMethodDto({
        brewMethodId: x._id,
        name: x.name,
        description: x.description
      }))
    });
    return responseDto;
  }
}