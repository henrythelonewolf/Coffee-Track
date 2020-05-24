import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/dal/repositories/user.repository';
import { LoginRequestDto, LoginResponseDto } from '../dto/session/login.dto';
import * as jwt from 'jsonwebtoken';
import { Role } from 'src/dal/schemas/role.schema';
import * as bcrypt from 'bcrypt';
import { accessSecretKey, refreshSecretKey, accessTokenExpiry, refreshTokenExpiry } from 'src/shared/configs/tokens.config';

@Injectable()
export class SessionService {
  constructor(private userRepository: UserRepository) {}
  async authenticate(request: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findUserByEmail(request.user.email);
    console.log(user);
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

    const payload = {
      email: user.email,
      role: role.roleDescription
    };
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

  // async getAll(): Promise<User[]> {
  //   const users = await this.userModel.find().exec();
  //   const user = await users.find(x => true).populate('role').execPopulate();
  //   console.log(user.role);
  //   return users;
  // }
}
