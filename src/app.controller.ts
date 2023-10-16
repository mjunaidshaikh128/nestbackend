import { Controller, Get, Request, Post, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';
import { RolesGuard } from './auth/roles.guard';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private usersService: UsersService, private prisma: PrismaService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() data) {
    return this.authService.register(data);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  // @Roles(Role.User)
  // @UseGuards(RolesGuard)
  @Get('allusers')
  getAllUsers(@Request() req) {
    return this.authService.doSomething(req)
  }
  @Get('user/:username')
  getUser(@Param('username') username) {
    return this.usersService.findOne(username)
  }

  // @Get('items')
  // async getallItems() {
  //   const allItems = await this.prisma.item.findMany({
  //     include: {
  //       type: true,
  //       owner: true,
  //       location: true,
  //       equipments: true
  //     }
  //   })
  //   return allItems
  
  // }


}