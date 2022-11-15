import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { Roles } from './common/decorator/role.decorator';
import { RolesGuard } from './common/guards/role.guard';
import User from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'user'])
  async findOne(@Req() request) {
    console.log(request.user.id);
  }

  // getHello(@UserEntity() user: User) {
  //   console.log(user);
  //   return user;
  //   return this.appService.getHello();
  // }
}
