import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDto } from './dto/users.dto';
import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import { IPayloadUserJwt, Token } from './dto/jwt.dto';
import { SecurityConfig } from 'src/common/config.interface';
import { LoginDto } from './dto/login.dto';
import User from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(userDetail: UserDto) {
    try {
      const hashedPassword = await this.passwordService.hashPassword(
        userDetail.password,
      );
      return await this.usersService.createUser(userDetail, hashedPassword);
    } catch (e) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async login(payload: LoginDto) {
    try {
      let user = await this.usersService.findUser(payload.email);
      if (!user) {
        throw new NotFoundException(
          `No user found for email: ${payload.email}`,
        );
      }
      const passwordValid = await this.passwordService.validatePassword(
        payload.password,
        user.password,
      );
      if (!passwordValid) {
        throw new BadRequestException('Invalid password');
      }
      const jwtToken = this.generateTokens({ userId: user.id });
      let userDetail = { ...user, ...jwtToken };
      return userDetail;
    } catch (e) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  private generateTokens(payload: { userId: number }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: number }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: number }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }
}
