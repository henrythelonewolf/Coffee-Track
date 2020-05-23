import { Controller, Post, HttpCode, HttpStatus, Body, Header, Res, Get } from '@nestjs/common';
import { LoginResponseDto, LoginRequestDto } from './dto/login.dto';
import { SessionService } from './session.service';
import { AuthenticationResponseDto } from './dto/authentication.dto';
import { Response } from 'express';

export const cookieSecretKey = 'B5r+/HF5JJW4YerVYBPMQAOuM4Q0+MxqBJ0/gOmfbhMPGBKbDeDyzasTugJkh74TLgfkeBnG6ZwYXOBxdRHZKwOBO4B+Y8VNvcbapbVKBSFZzUVv1GSC/I3adXIwuh3aLgHhYy+BJ5TeGeWesk0EUO1YVvY1A+k9uIHYaEXxzy3n6eHNUN0iFJZ2fe306J6NNK89BOTya/lHhPnrOo7qmQDdKUVUGb/hQytG92Ik+ztUGJJnDlqcKeF7sHq2yienV2oLwpl/wMa530P4BrNRqSjJtV+UsJYjvQrauf0p5gMPsabyhOfdMEtLAiF6L5rfpWF9M1RMKYk3ZL6x3EkkoQ==';

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
