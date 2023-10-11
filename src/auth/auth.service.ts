import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service'
import { User, Prisma } from '@prisma/client';
const bcrypt = require('bcrypt');
const saltRounds = 10;


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
        throw new HttpException('Invalid username', HttpStatus.NOT_FOUND);
      }
  
    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid password', HttpStatus.NOT_FOUND);
    }

    if (user && passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async doSomething(req: any) {
    console.log(req.user);
    if (!req.user.roles.includes('admin')) {
        throw new HttpException('Forbidden Resource', HttpStatus.FORBIDDEN)
    }
    return req.user
  }
  async register(data: any): Promise<any> {
    try {
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const newUser = await this.prisma.user.create({
          data: {
            email: data.email,
            password: hashedPassword,
            username: data.username,
            location: data.location,
          },
        });
        const { password, resetToken, ...rest } = newUser;
        return rest;
      } catch (err) {
        throw new Error(err);
      }
    }
}