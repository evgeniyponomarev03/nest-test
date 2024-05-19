import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/singin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  sign(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('/signup')
  signup(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
