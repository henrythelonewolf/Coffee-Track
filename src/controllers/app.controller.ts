import { Controller, Get, UseGuards } from '@nestjs/common';
import { RootResponse } from '../dto/root.dto';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): RootResponse {
    const response = {
      message: 'service is up!'
    };
    return response;
  }

  @Get('meows')
  @UseGuards(AuthGuard)
  getMeow(): any {
    return {
      message: 'meow'
    };
  }
}
