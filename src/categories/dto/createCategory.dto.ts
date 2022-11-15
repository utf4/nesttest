import { IsString, Length, Validate } from 'class-validator';
import { CategoryExistsValidator } from '../validator/category.validator';

export class CreateCategoryDto {
  @IsString()
  @Length(3, 200)
  @Validate(CategoryExistsValidator)
  name: string;
}
