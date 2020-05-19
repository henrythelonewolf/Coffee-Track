import { Controller, Post, HttpCode, HttpStatus, Body, Header } from '@nestjs/common';
import { LoginResponseDto, LoginRequestDto } from './dto/login.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
    console.log(request);
    const users = await this.sessionService.getAll();
    console.log(users);
    return null;
  }
}
