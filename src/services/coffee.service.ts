import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from 'src/dal/repositories/coffee.repository';

@Injectable()
export class CoffeeService {
  constructor(private coffeeRepository: CoffeeRepository) {}
}
