import { Injectable } from "@nestjs/common"
import { Brew } from "@schemas/brew.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBrewMethodRequestDto, CreateBrewMethodResponseDto } from "@dto/brew/brew.dto";
import * as mongoose from 'mongoose';
import { ErrorResponseDto } from "@dto/shared/error-response.dto";

@Injectable()
export class BrewRepository {
  constructor(@InjectModel(Brew.name) private readonly brewModel: Model<Brew>) {}

  async createBrewMethod(request: CreateBrewMethodRequestDto): Promise<CreateBrewMethodResponseDto> {
    try {
      const brewMethod = new this.brewModel({
        name: request.name,
        description: request.description,
        createdBy: mongoose.Types.ObjectId(request.userId),
        updatedBy: mongoose.Types.ObjectId(request.userId)
      });
      await brewMethod.save();
      
      const responseDto = new CreateBrewMethodResponseDto({
        brewMethod: brewMethod
      });
      return responseDto;
    } catch (error) {
      console.log(error);
      const responseDto = new CreateBrewMethodResponseDto({
        error: new ErrorResponseDto({
          code: 'CreateError',
          message: error.message
        })
      });
      return responseDto;
    }
  }
}