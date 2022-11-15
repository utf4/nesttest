import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const userRole = this.reflector.get<string>('roles', context.getHandler());
    const userDetails = context.switchToHttp().getRequest().user;
    if (userRole.indexOf(userDetails.role) > -1) {
      return true;
    }
    return false;
  }
}
