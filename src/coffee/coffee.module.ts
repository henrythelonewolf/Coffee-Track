import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from 'src/dal/schemas/coffee.schema';
import { CoffeeType, CoffeeTypeSchema } from 'src/dal/schemas/coffee-type.schema';
import { CoffeeRepository } from 'src/dal/repositories/coffee.repository';

const services = [CoffeeService];
const repositories = [CoffeeRepository];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coffee.name, schema: CoffeeSchema }, 
      { name: CoffeeType.name, schema: CoffeeTypeSchema },
    ])
  ],
  controllers: [CoffeeController],
  providers: [...services, ...repositories],
})
export class CoffeeModule {}
