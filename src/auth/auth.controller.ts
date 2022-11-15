import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() user: UserDto) {
    return await this.authService.signUp(user);
  }

  @Post('/login')
  async login(@Body() userData: LoginDto) {
    return await this.authService.login(userData);
  }
}
