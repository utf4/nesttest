import { IsInt, Validate } from 'class-validator';
import { IsExistsValidator } from '../validator/isExists.validator';

export class DeleteBookDto {
  @IsInt()
  @Validate(IsExistsValidator)
  id: number;
}
