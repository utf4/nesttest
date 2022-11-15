import { IsNumber, Validate } from 'class-validator';
import { IsExistsValidator } from 'src/books/validator/isExists.validator';

export class OrderItemsDto {
  @IsNumber()
  bookCount: number;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  orderId: number;

  @IsNumber()
  @Validate(IsExistsValidator)
  bookId: number;

  @IsNumber()
  userId: number;
}
