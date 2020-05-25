import { AuthenticationResponseDto } from '@dto/session/authentication.dto';
import { LoginRequestDto } from '@dto/session/login.dto';
import { RefreshRequestDto } from '@dto/session/refresh.dto';
import { ErrorResponseDto } from '@dto/shared/error-response.dto';
import { BadRequestException, Body, Controller, Header, HttpCode, HttpStatus, InternalServerErrorException, Post, Res } from '@nestjs/common';
import { SessionService } from '@services/session.service';
import { Cookie } from '@shared/decorators/cookie.decorators';
import { Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async login(@Body() request: LoginRequestDto, @Res() res: Response): Promise<any> {
    // authenticate user
    const response = await this.sessionService.authenticate(request);
    if (typeof response.error !== 'undefined') {
      throw new BadRequestException(response.error);
    }

    const jsonPayload: AuthenticationResponseDto = {
      user: {
        email: response.user.email,
        role: response.user.role,
      },
      accessToken: response.access.accessToken,
      expiresIn: response.access.expiresIn
    };
    
    // set refresh token in cookie then return
    res.cookie('jwt-refresh-token', response.refresh.refreshToken, {signed: true, httpOnly: true, path: '/api/session'}).json(jsonPayload);
    return res.send();
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Cookie() cookie: string, @Res() res: Response) {
    // validate refresh token length
    if (cookie.length === 0) {
      throw new BadRequestException(new ErrorResponseDto({
        code: 'RefreshError',
        message: 'Refresh token invalid.'
      }));
    }
    
    // send request to session service to refresh tokens
    const requestDto = new RefreshRequestDto({
      refreshToken: cookie
    });
    const responseDto = await this.sessionService.refresh(requestDto);

    // error validation
    if (typeof responseDto.error !== 'undefined') {
      throw new InternalServerErrorException(responseDto.error);
    }
    
    const jsonPayload = {
      user: {
        email: responseDto.user.email,
        role: responseDto.user.role
      },
      accessToken: responseDto.access.accessToken,
      expiresIn: responseDto.access.expiresIn
    }
    
    // set cookie and return
    res.cookie('jwt-refresh-token', responseDto.refresh.refreshToken, {signed: true, httpOnly: true, path: '/api/session', maxAge: responseDto.refresh.expiresIn * 1000}).json(jsonPayload);
    return res.send();
  }
}
