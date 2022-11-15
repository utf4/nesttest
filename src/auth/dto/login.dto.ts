import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(8,15)
  password: string;
}