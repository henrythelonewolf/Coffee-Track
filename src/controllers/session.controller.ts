import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationResponseDto } from '../dto/session/authentication.dto';
import { LoginRequestDto } from '../dto/session/login.dto';
import { SessionService } from '../services/session.service';

@Controller('/api/session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async login(@Body() request: LoginRequestDto, @Res() res: Response): Promise<any> {
    const response = await this.sessionService.authenticate(request);
    const jsonPayload: AuthenticationResponseDto = {
      user: {
        email: response.user.email,
        role: response.user.role
      },
      accessToken: response.access.accessToken,
      expiresIn: response.access.expiresIn
    };
    
    res.cookie('jwt-refresh-token', response.refresh.refreshToken, {signed: true, httpOnly: true, path: '/session/refresh'}).json(jsonPayload);
    return res.send();
  }

  @Post('/refresh')
  @Header('Content-Type', 'application/json')
  async refresh(@Body() request: any) {
    console.log('hello');
  }
}
