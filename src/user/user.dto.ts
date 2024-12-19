import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Transform(({ value }) => value.toLowerCase())
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Expose()
  password: string;
}
