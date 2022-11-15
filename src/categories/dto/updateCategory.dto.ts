import { IsInt, IsOptional, IsString, Length, Validate } from 'class-validator';
import { CategoryExistsValidator } from '../validator/category.validator';
import { IsExistsValidator } from '../validator/isExists.validator.dto';

export class UpdateCategoryDto {
  @IsOptional()
  @IsInt()
  @Validate(IsExistsValidator)
  id: number;

  @IsString()
  @Length(3, 200)
  @Validate(CategoryExistsValidator)
  name: string;
}
