import { CreateCoffeeTypeRequest, CreateCoffeeTypeRequestDto } from '@dto/coffee/coffee-type.dto';
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CoffeeService } from '@services/coffee.service';
import { User } from '@shared/decorators/user.decorators';
import { AuthGuard } from '@shared/guards/auth.guard';

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
