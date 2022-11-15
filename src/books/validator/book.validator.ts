import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BooksService } from '../books.service';

/**
 * Custom validator, checks for name/email unique.
 * Make sure that all your dependencies are not SCOPE.Default'ed.
 */
@ValidatorConstraint({ name: 'name', async: true })
@Injectable()
export class BookExistsValidator implements ValidatorConstraintInterface {
  constructor(private bookService: BooksService) {}

  /**
   * Method should return true, if name is not taken.
   */
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const book = value ? value.trim() : '';
    let isExist = await this.bookService.findBook(book);
    if (!isExist) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Book with $property $value already exists';
  }
}
