import { IsInt, IsOptional, IsString, Length, Validate } from 'class-validator';
import { BookExistsValidator } from '../validator/book.validator';
import { IsExistsValidator } from '../validator/isExists.validator';

export class UpdateBookDto {
  @IsInt()
  @Validate(IsExistsValidator)
  id: number;

  @IsOptional()
  @IsString()
  @Length(3, 200)
  @Validate(BookExistsValidator)
  title: string;

  @IsOptional()
  @IsString()
  publishedYear: string;

  @IsOptional()
  @IsString()
  @Length(3, 200)
  authorName: string;

  @IsOptional()
  @IsInt()
  noOfCopies: number;

  @IsOptional()
  @IsInt()
  price: number;
}
