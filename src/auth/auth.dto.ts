import { IsString, IsNotEmpty } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  refreshToken: string;
}
