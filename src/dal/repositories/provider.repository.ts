import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CoffeeProvider } from "../schemas/provider.schema";
import { Model } from "mongoose";
import { CreateCoffeeProviderResponseDto, CreateCoffeeProviderRequestDto } from "src/dto/provider/provider.dto";
import { ErrorResponseDto } from "src/dto/shared/error-response.dto";

@Injectable()
export class ProviderRepository {
  constructor(@InjectModel(CoffeeProvider.name) private readonly providerModel: Model<CoffeeProvider>) {}

  async createCoffeeProvider(request: CreateCoffeeProviderRequestDto): Promise<CreateCoffeeProviderResponseDto> {
    const response = new CreateCoffeeProviderResponseDto();
    try {  
      const model = new this.providerModel({
        name: request.name,
        lat: request.lat,
        long: request.long
      });
      await model.save();
    } catch (exception) {
      console.log(exception);
      response.error = new ErrorResponseDto({
        code: 'CreateError'
      });
    }
    return response;
  }
}