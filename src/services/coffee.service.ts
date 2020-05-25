import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from 'src/dal/repositories/coffee.repository';
import { CreateCoffeeTypeRequestDto } from 'src/dto/coffee/coffee-type.dto';

@Injectable()
export class CoffeeService {
  constructor(private coffeeRepository: CoffeeRepository) {}

  async createCoffeeType(request: CreateCoffeeTypeRequestDto): Promise<any> {
    console.log(request);
    const result = await this.coffeeRepository.createCoffeeType(request);
    return result;
  }
}
