import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
export class CategoryExistsValidator implements ValidatorConstraintInterface {
  constructor(
    private categoryService: CategoriesService,
  ) {}

  /**
   * Method should return true, if name is not taken.
   */
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const category = value ? value.trim() : '';
    let isExist = await this.categoryService.findCategory(category);
    if (!isExist) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Category with $property $value already exists';
  }
}
