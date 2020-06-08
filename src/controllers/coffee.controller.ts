import { CreateCoffeeTypeRequest, CreateCoffeeTypeRequestDto, CreateCoffeeTypeResponse } from '@dto/coffee/create.coffee-type.dto';
import { AccessTokenDto } from '@dto/shared/access-token.dto';
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { CoffeeService } from '@services/coffee.service';
import { User } from '@shared/decorators/user.decorators';
import { AuthGuard } from '@shared/guards/auth.guard';
import { ErrorResponseDto } from '@dto/shared/error-response.dto';
import { extractErrorMessage } from '@shared/helper/error.helper';
import { CreateCoffeeRequest, CreateCoffeeResponse, CreateCoffeeRequestDto } from '@dto/coffee/create.coffee.dto';
import { ErrorConstants } from '@shared/constants/error.constant';
import { GetAllCoffeeResponse, GetAllCoffeeRequestDto } from '@dto/coffee/fetch.coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private coffeeService: CoffeeService) {}
  
  // #region coffee
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createCoffee(@User() user: AccessTokenDto, @Body() request: CreateCoffeeRequest): Promise<CreateCoffeeResponse> {
    try {
      const requestDto = new CreateCoffeeRequestDto({
        boughtDateStr: request.boughtDate,
        roastDateStr: request.roastDate,
        coffeeProviderId: request.coffeeProviderId,
        weight: request.weight,
        userId: user.userId,
        coffeeTypeId: request.coffeeTypeId
      });
      const responseDto = await this.coffeeService.createCoffee(requestDto);
      if (responseDto.hasError === true) {
        const error = responseDto.error;
        switch(error.code) {
          case 'CreateError':
            throw new BadRequestException(error);
          case 'InternalError':
          default:
            throw new InternalServerErrorException(error);
        }
      }

      const response = new CreateCoffeeResponse({
        coffee: responseDto.coffee
      });
      return response;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(new ErrorResponseDto({
        code: 'InternalError',
        message: 'An unexpected error occured.'
      }));
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getCoffees(@User() user: AccessTokenDto): Promise<GetAllCoffeeResponse> {
    try {
      const requestDto = new GetAllCoffeeRequestDto({
        userId: user.userId
      });
      const responseDto = await this.coffeeService.getAllCoffees(requestDto);
      if (responseDto.hasError === true) {
        const error = responseDto.error;
        switch(error.code) {
          case 'FetchError':
            throw new BadRequestException(error);
          case 'InternalError':
          default:
            throw new InternalServerErrorException(error);
        }
      }

      const response = new GetAllCoffeeResponse({
        coffee: responseDto.coffee
      });
      return response;
    } catch (error) {
      console.log(error);
      
      const msg = extractErrorMessage(error);
      throw new InternalServerErrorException(new ErrorResponseDto({
        code: 'InternalError',
        message: msg
      }));
    }
  }
  // #endregion

  // #region coffee type
  @Post('/type')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createCoffeeType(@User() user: AccessTokenDto, @Body() request: CreateCoffeeTypeRequest): Promise<CreateCoffeeTypeResponse> {
    const requestDto: CreateCoffeeTypeRequestDto = {
      region: request.region,
      remarks: request.remarks,
      userId: user.userId
    };

    const responseDto = await this.coffeeService.createCoffeeType(requestDto);
    if (typeof responseDto.error !== 'undefined') {
      throw new BadRequestException(responseDto.error);
    }

    const response = new CreateCoffeeTypeResponse({
      coffeeType: responseDto.coffeeType
    });
    return response;
  }

  @Get('/type')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getCoffeeTypes(@User() user: AccessTokenDto): Promise<any> {
    try {
      const responseDto = await this.coffeeService.getAllCoffeeTypes();
      if (responseDto.hasError === true) {
        throw new BadRequestException(responseDto.error);
      }

      return responseDto;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(new ErrorResponseDto({
        code: 'InternalError',
        message: 'An exception occured.'
      }));
    }
  }
  // #endregion
}
