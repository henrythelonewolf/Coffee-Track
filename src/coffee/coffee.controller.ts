import { Controller, Get } from '@nestjs/common';
import { CoffeeService } from './coffee.service';

@Controller('coffee')
export class CoffeeController {
  constructor(private coffeeService: CoffeeService) {}
  
  @Get()
  async getCoffee(): Promise<any> {
    
  }
}
