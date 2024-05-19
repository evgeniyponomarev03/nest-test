import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  sign(@Body() body: any) {
    return this.authService.signIn(body);
  }

  @Post('/signup')
  signup(@Body() body: any) {
    return this.authService.signUp(body);
  }
}
