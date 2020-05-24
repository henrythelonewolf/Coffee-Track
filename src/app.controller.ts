import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RootResponse } from './dto/root.dto';
import { AuthGuard } from './shared/guards/auth.guard';

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

  @Get('meows')
  @UseGuards(AuthGuard)
  getMeow(): any {
    return {
      message: 'meow'
    };
  }
}
