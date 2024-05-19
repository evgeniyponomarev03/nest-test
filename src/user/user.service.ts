import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    return this.prisma.user.create({
      data: { ...body, password: hashedPassword },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return {
      result: user,
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return null;
    } catch {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
