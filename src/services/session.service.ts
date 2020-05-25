import { LoginRequestDto, LoginResponseDto } from '@dto/session/login.dto';
import { RefreshRequestDto, RefreshResponseDto } from '@dto/session/refresh.dto';
import { ErrorResponseDto } from '@dto/shared/error-response.dto';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/user.repository';
import { Role } from '@schemas/role.schema';
import { accessSecretKey, accessTokenExpiry, refreshSecretKey, refreshTokenExpiry } from '@shared/configs/tokens.config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SessionService {
  constructor(private userRepository: UserRepository) {}
  async authenticate(request: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findUserByEmail(request.user.email);
    
    // user not exist validation
    if (typeof user === 'undefined') {
      const responseDto: LoginResponseDto = {
        error: {
          code: 'error',
          message: 'Email or password invalid.'
        }
      };
      return responseDto;
    }
    
    // authenticate
    const match = await bcrypt.compare(request.user.password, user.password);
    if (match == false) {
      const responseDto: LoginResponseDto = {
        error: {
          code: 'error',
          message: 'Email or password invalid.'
        }
      };
      return responseDto;
    }
    
    const role = user.role as Role;

    // token payloads
    const payload = {
      email: user.email,
      userId: user.id,
      role: role.roleDescription,
    };

    // signing tokens
    const accessToken = jwt.sign(payload, accessSecretKey, { algorithm: 'HS256', expiresIn: accessTokenExpiry });
    const refreshToken = jwt.sign(payload, refreshSecretKey, { algorithm: 'HS256', expiresIn: refreshTokenExpiry });
    
    const responseDto: LoginResponseDto = {
      user: {
        email: request.user.email,
        role: role.roleDescription
      },
      access: {
        accessToken,
        expiresIn: accessTokenExpiry
      },
      refresh: {
        refreshToken,
        expiresIn: refreshTokenExpiry
      },
    };
    return responseDto;
  }

  async refresh(request: RefreshRequestDto): Promise<RefreshResponseDto> {
    let responseDto = new RefreshResponseDto();

    try {
      const decodedPayload: any = jwt.decode(request.refreshToken);
      const email = decodedPayload.email;
      const role = decodedPayload.role;
      const userId = decodedPayload.userId;

      const payload = {
        email,
        role,
        userId
      };

      const accessToken = jwt.sign(payload, accessSecretKey, { algorithm: 'HS256', expiresIn: accessTokenExpiry });
      const refreshToken = jwt.sign(payload, refreshSecretKey, { algorithm: 'HS256', expiresIn: refreshTokenExpiry });

      Object.assign(responseDto, {
        user: {
          email,
          role
        },
        access: {
          accessToken,
          expiresIn: accessTokenExpiry
        },
        refresh: {
          refreshToken,
          expiresIn: refreshTokenExpiry
        },
      });
    } catch (exception) {
      console.log(exception);
      responseDto.error = new ErrorResponseDto({
        code: 'RefreshError',
        message: 'Something went wrong when refreshing token.'
      });
    }

    return responseDto;
  }

  // async getAll(): Promise<User[]> {
  //   const users = await this.userModel.find().exec();
  //   const user = await users.find(x => true).populate('role').execPopulate();
  //   console.log(user.role);
  //   return users;
  // }
}
