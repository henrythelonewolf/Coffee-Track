import { Controller, Get, Post, UseGuards, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { CoffeeService } from '../services/coffee.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorators';
import { CreateCoffeeTypeRequest, CreateCoffeeTypeRequestDto } from 'src/dto/coffee/coffee-type.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private coffeeService: CoffeeService) {}
  
  @Get()
  async getCoffees(): Promise<any> {
    
  }

  @Post('/type/create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createCoffeeType(@User() user, @Body() request: CreateCoffeeTypeRequest): Promise<any> {
    const requestDto: CreateCoffeeTypeRequestDto = {
      region: request.region,
      remarks: request.remarks,
      userId: user.userId
    };
    const result = await this.coffeeService.createCoffeeType(requestDto);
    if (result == false) {
      throw new BadRequestException({
        error: {
          message: 'create coffee type failed!'
        }
      });
    }

    return null;
  }
}
