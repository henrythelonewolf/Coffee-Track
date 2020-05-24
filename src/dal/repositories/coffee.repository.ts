import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Coffee } from '../schemas/coffee.schema';
import { CoffeeType } from '../schemas/coffee-type.schema';
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
}