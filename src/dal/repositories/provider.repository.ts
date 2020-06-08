import { CreateCoffeeProviderRequestDto, CreateCoffeeProviderResponseDto } from "@dto/provider/provider.dto";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CoffeeProvider } from "@schemas/provider.schema";
import { Model } from "mongoose";
import { GetAllCoffeeProviderResponseDto } from "@dto/provider/fetch.provider.dto";
import { extractErrorMessage } from "@shared/helper/error.helper";

@Injectable()
export class ProviderRepository {
  constructor(@InjectModel(CoffeeProvider.name) private readonly providerModel: Model<CoffeeProvider>) {}

  async createCoffeeProvider(request: CreateCoffeeProviderRequestDto): Promise<CreateCoffeeProviderResponseDto> {
    const response = new CreateCoffeeProviderResponseDto();
    try {  
      const model = new this.providerModel({
        name: request.name,
        lat: request.lat,
        long: request.long,
        createdBy: request.userId,
        updatedBy: request.userId
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

  async getAllCoffeeProviders(): Promise<GetAllCoffeeProviderResponseDto> {
    try {
      const coffeeProviders = await this.providerModel.find({});
      const responseDto = new GetAllCoffeeProviderResponseDto({
        rawCoffeeProviders: coffeeProviders
      });
      
      return responseDto;
    } catch (error) {
      console.log(error);

      const msg = extractErrorMessage(error);
      const responseDto = new GetAllCoffeeProviderResponseDto({
        error: new ErrorResponseDto({
          code: 'FetchError',
          message: msg
        })
      });

      return responseDto;
    }
  }
}