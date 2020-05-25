import { CreateCoffeeTypeRequestDto } from "@dto/coffee/coffee-type.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CoffeeType } from '@schemas/coffee-type.schema';
import { Coffee } from '@schemas/coffee.schema';
import * as mongoose from 'mongoose';
import { Model } from "mongoose";

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(CoffeeType.name) private readonly coffeeTypeModel: Model<CoffeeType>
  ) {}

  async getAllCoffees(): Promise<Array<Coffee>> {
    const coffees = await this.coffeeModel.find({});
    return coffees;
  }

  async getAllCoffeeTypes(): Promise<Array<CoffeeType>> {
    const coffeeTypes = await this.coffeeTypeModel.find({});
    return coffeeTypes;
  }

  async createCoffeeType(request: CreateCoffeeTypeRequestDto): Promise<boolean> {
    try {
      var coffeeType = new this.coffeeTypeModel({
        region: request.region,  
        remarks: request.remarks,
        createdBy: mongoose.Types.ObjectId(request.userId),
        updatedBy: mongoose.Types.ObjectId(request.userId)
      });
      await coffeeType.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}