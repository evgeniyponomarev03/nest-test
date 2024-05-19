import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
