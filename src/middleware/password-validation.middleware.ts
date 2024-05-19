import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordValidationMiddleware implements NestMiddleware {
  constructor(private readonly user: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.user.findOneByEmail(req.body.email);

    if (!user) {
      throw new NotFoundException(
        `User with email ${req.body.email} not found`,
      );
    }

    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user?.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    next();
  }
}
