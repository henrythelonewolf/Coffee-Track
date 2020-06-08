import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from '@repositories/coffee.repository';
import { CreateCoffeeTypeRequestDto, CreateCoffeeTypeResponseDto } from '@dto/coffee/create.coffee-type.dto';
import { GetAllCoffeeTypeResponseDto, CoffeeTypeDto } from '@dto/coffee/fetch.coffee-type.dto';
import { extractErrorMessage } from '@shared/helper/error.helper';
import { ErrorResponseDto } from '@dto/shared/error-response.dto';
import { CreateCoffeeRequestDto, CreateCoffeeResponseDto } from '@dto/coffee/create.coffee.dto';
import { GetAllCoffeeRequestDto, GetAllCoffeeResponseDto, CoffeeDto } from '@dto/coffee/fetch.coffee.dto';
import { CoffeeType } from '@schemas/coffee-type.schema';
import { CoffeeProvider } from '@schemas/provider.schema';

@Injectable()
export class CoffeeService {
  constructor(private coffeeRepository: CoffeeRepository) {}

  // #region coffee
  async createCoffee(requestDto: CreateCoffeeRequestDto): Promise<CreateCoffeeResponseDto> {
    try {
      const roastDate = new Date(requestDto.roastDateStr);
      const boughtDate = new Date(requestDto.boughtDateStr);
      const request = new CreateCoffeeRequestDto({
        ...requestDto,
        roastDate,
        boughtDate,
      });
      const response = await this.coffeeRepository.createCoffee(request);
      return response;
    } catch (error) {
      console.log(error);

      const response = new CreateCoffeeResponseDto({
        error: new ErrorResponseDto({
          code: 'InternalError',
          message: 'An unexpected error occured.'
        })
      });
      return response;
    }
  }

  async getAllCoffees(request: GetAllCoffeeRequestDto): Promise<GetAllCoffeeResponseDto> {
    try {
      const responseDto = await this.coffeeRepository.getAllCoffees(request);
      if (responseDto.hasError === true) {
        return responseDto;
      }

      const response = new GetAllCoffeeResponseDto({
        coffee: responseDto.rawCoffee.map(x => new CoffeeDto({
          coffeeId: x._id,
          coffeeType: {
            region: (x.coffeeType as CoffeeType).region,
            remarks: (x.coffeeType as CoffeeType).remarks,
          },
          coffeeProvider: {
            name: (x.provider as CoffeeProvider).name
          },
          weight: x.weight,
          boughtDate: x.boughtDate.toISOString(),
          roastDate: x.roastDate.toISOString()
        }))
      });
      return response;
    } catch (error) {
      console.log(error);

      const msg = extractErrorMessage(error);
      const response = new GetAllCoffeeResponseDto({
        error: new ErrorResponseDto({
          code: 'InternalError',
          message: msg
        })
      });
      return response;
    }
  }
  // #endregion

  // #region coffee type
  async createCoffeeType(request: CreateCoffeeTypeRequestDto): Promise<CreateCoffeeTypeResponseDto> {
    const result = await this.coffeeRepository.createCoffeeType(request);
    return result;
  }

  async getAllCoffeeTypes(): Promise<GetAllCoffeeTypeResponseDto> {
    const repoResponseDto = await this.coffeeRepository.getAllCoffeeTypes();
    try {
      if (typeof repoResponseDto.error !== 'undefined') {
        return repoResponseDto;
      }

      const responseDto = new GetAllCoffeeTypeResponseDto({
        coffeeTypes: repoResponseDto.rawCoffeeTypes.map(x => new CoffeeTypeDto({
          coffeeTypeId: x._id,
          region: x.region,
          remarks: x.remarks
        }))
      });
      return responseDto;
    } catch (error) {
      console.log(error);

      const errorMessage = extractErrorMessage(error);
      const responseDto = new GetAllCoffeeTypeResponseDto({
        error: new ErrorResponseDto({
          code: 'FetchError',
          message: errorMessage
        })
      });
      return responseDto;
    }
  }
  // #endregion
}