import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: any) {
    const user = await this.user.findOneByEmail(body.email);

    console.log({ user });

    if (!user) {
      throw new NotFoundException(`User with email ${body.email} not found`);
    }

    const passwordMatches = await bcrypt.compare(body.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const payload = {
      date: new Date(),
      userId: user.id,
      email: user.email,
      role: 'USER',
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signUp(body: any) {
    const user = await this.user.findOneByEmail(body.email);

    if (user) {
      throw new ConflictException('Email already in use');
    }

    const newUser = await this.user.create(body);

    const payload = {
      date: new Date(),
      userId: newUser.id,
      email: newUser.email,
      role: 'USER',
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
