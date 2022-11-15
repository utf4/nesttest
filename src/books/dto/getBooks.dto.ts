import { IsInt, IsOptional, Min } from 'class-validator';
import { SearchInput } from './searchInput.dto';

export class GetBooksDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip: number;

  @IsOptional()
  @IsInt()
  @Min(5)
  limit: number;

  @IsOptional()
  search: SearchInput;
}
