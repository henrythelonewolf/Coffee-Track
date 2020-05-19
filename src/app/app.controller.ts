import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RootResponse } from './dto/root.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): RootResponse {
    const message = this.appService.getHello();
    const response: RootResponse = {
      message
    };
    return response;
  }
}
