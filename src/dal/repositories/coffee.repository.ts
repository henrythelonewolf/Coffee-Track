import { CreateCoffeeTypeRequestDto, CreateCoffeeTypeResponseDto } from "@dto/coffee/create.coffee-type.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CoffeeType } from '@schemas/coffee-type.schema';
import { Coffee } from '@schemas/coffee.schema';
import * as mongoose from 'mongoose';
import { Model } from "mongoose";
import { ErrorResponseDto } from "@dto/shared/error-response.dto";
import { extractErrorMessage } from "@shared/helper/error.helper";
import { GetAllCoffeeTypeResponseDto } from "@dto/coffee/fetch.coffee-type.dto";
import { CreateCoffeeRequestDto, CreateCoffeeResponseDto } from "@dto/coffee/create.coffee.dto";
import { GetAllCoffeeResponseDto, GetAllCoffeeRequestDto } from "@dto/coffee/fetch.coffee.dto";

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(CoffeeType.name) private readonly coffeeTypeModel: Model<CoffeeType>
  ) {}
  
  // #region coffee
  async getAllCoffees(request: GetAllCoffeeRequestDto): Promise<GetAllCoffeeResponseDto> {
    try {
      const coffees = await this.coffeeModel.find({createdBy: mongoose.Types.ObjectId(request.userId)}).populate('provider').populate('coffeeType');
      
      const response = new GetAllCoffeeResponseDto({
        rawCoffee: coffees
      });
      return response;
    } catch (error) {
      console.log(error);

      const msg = extractErrorMessage(error);
      const response = new GetAllCoffeeResponseDto({
        error: new ErrorResponseDto({
          code: 'FetchError',
          message: msg
        })
      });
      return response;
    }
  }

  async createCoffee(requestDto: CreateCoffeeRequestDto): Promise<CreateCoffeeResponseDto> {
    try {
      const coffee = new this.coffeeModel({
        coffeeType: mongoose.Types.ObjectId(requestDto.coffeeTypeId),
        provider: mongoose.Types.ObjectId(requestDto.coffeeProviderId),
        boughtDate: requestDto.boughtDate,
        roastDate: requestDto.roastDate,
        weight: requestDto.weight,
        createdBy: mongoose.Types.ObjectId(requestDto.userId),
        updatedBy: mongoose.Types.ObjectId(requestDto.userId),
      });
      await coffee.save();

      const responseDto = new CreateCoffeeResponseDto({
        coffee: coffee
      });
      return responseDto;
    } catch (error) {
      console.log(error);

      const msg = extractErrorMessage(error);
      const responseDto = new CreateCoffeeResponseDto({
        error: new ErrorResponseDto({
          code: 'CreateError',
          message: msg
        })
      });
      return responseDto;
    }
  }
  // #endregion

  // #region coffee types
  async getAllCoffeeTypes(): Promise<GetAllCoffeeTypeResponseDto> {
    const coffeeTypes = await this.coffeeTypeModel.find({});
    const responseDto = new GetAllCoffeeTypeResponseDto({
      rawCoffeeTypes: coffeeTypes
    });
    return responseDto;
  }

  async createCoffeeType(request: CreateCoffeeTypeRequestDto): Promise<any> {
    try {
      var coffeeType = new this.coffeeTypeModel({
        region: request.region,  
        remarks: request.remarks,
        createdBy: mongoose.Types.ObjectId(request.userId),
        updatedBy: mongoose.Types.ObjectId(request.userId)
      });
      await coffeeType.save();
      
      const responseDto = new CreateCoffeeTypeResponseDto({
        coffeeType: coffeeType
      });
      return responseDto;
    } catch (e) {
      console.log(request);
      console.log(e);
      const errorMessage = extractErrorMessage(e);

      const responseDto = new CreateCoffeeTypeResponseDto({
        error: new ErrorResponseDto({
          code: 'CreateError',
          message: errorMessage
        })
      });
      return responseDto;
    }
  }
  // #endregion
}