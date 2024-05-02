import { IsEmail, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  name: string;

  @Min(6)
  @IsNotEmpty()
  password: string;
}
