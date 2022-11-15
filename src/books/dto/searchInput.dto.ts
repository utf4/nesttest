import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class SearchInput {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  publishedYear: string;

  @IsOptional()
  @IsString()
  authorName: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  @IsInt()
  noOfCopies: number;

  @IsOptional()
  @IsBoolean()
  soldOut: boolean;

  @IsOptional()
  createdAt: Date;
}
