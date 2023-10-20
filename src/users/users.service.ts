import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {  User,Prisma } from '@prisma/client';

// This should be a real class/interface representing a user entity
//  export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: ['admin']
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: ['admin']
    },
  ];

  
  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
        where: {
            username
        }
    })
    console.log(user);
    return user
  }


//   async findAnotherOne(username: string): Promise<User> {
//     const user = await this.users.find(user => user.username === username)
//     console.log(user);
//     return user
//   }
}