import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoriesService } from '../categories.service';

/**
 * Custom validator, checks for name/email unique.
 * Make sure that all your dependencies are not SCOPE.Default'ed.
 */
@ValidatorConstraint({ name: 'name', async: true })
@Injectable()
export class IsExistsValidator implements ValidatorConstraintInterface {
  constructor(private categoryService: CategoriesService) {}

  /**
   * Method should return true, if name is not taken.
   */
  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    const categoryId = value ? value : null;
    let isExist = await this.categoryService.findById(categoryId);
    if (isExist) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Category with $property ${args.value} doesn't exists`;
  }
}
