import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from '@repositories/coffee.repository';
import { CreateCoffeeTypeRequestDto } from '@dto/coffee/coffee-type.dto';

@Injectable()
export class CoffeeService {
  constructor(private coffeeRepository: CoffeeRepository) {}

  async createCoffeeType(request: CreateCoffeeTypeRequestDto): Promise<any> {
    console.log(request);
    const result = await this.coffeeRepository.createCoffeeType(request);
    return result;
  }
}