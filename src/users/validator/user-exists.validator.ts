import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users.service';

/**
 * Custom validator, checks for name/email unique.
 * Make sure that all your dependencies are not SCOPE.Default'ed.
 */
@ValidatorConstraint({ name: 'name', async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(
    private userService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Method should return true, if name is not taken.
   */
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const userEmail = value ? value.trim() : '';
    let isExist = await await this.userRepository.find({
      where: { email: userEmail },
    });
    if (isExist.length > 0) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with $property $value already exists';
  }
}
