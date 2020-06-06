import { Injectable } from "@nestjs/common"
import { CreateBrewMethodRequestDto, CreateBrewMethodResponseDto } from "@dto/brew/brew.dto";
import { BrewRepository } from "@repositories/brew.repository";

@Injectable()
export class BrewService {
  constructor(private brewRepository: BrewRepository) {}

  async createBrewMethod(request: CreateBrewMethodRequestDto): Promise<CreateBrewMethodResponseDto> {
    const response = await this.brewRepository.createBrewMethod(request);
    return response;
  }
}