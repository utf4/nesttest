import { IsInt, IsString, Length, Validate } from 'class-validator';
import { BookExistsValidator } from '../validator/book.validator';

export class CreateBookDto {
  @IsString()
  @Length(3, 200)
  @Validate(BookExistsValidator)
  title: string;

  @IsString()
  publishedYear: string;

  @IsString()
  @Length(3, 200)
  authorName: string;

  @IsInt()
  noOfCopies: number;

  @IsInt()
  price: number;

  @IsInt()
  categoryId: number;
}
