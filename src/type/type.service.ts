import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from 'src/prisma.service';
import { Type } from '@prisma/client';

@Injectable()
export class TypeService {

constructor(private prisma: PrismaService) {}

  async create(createTypeDto: any):Promise<Type | undefined> {
    return this.prisma.type.create({
      data: createTypeDto
      
    })
  }

  async findAll(): Promise<Type[] | undefined> {
    return await this.prisma.type.findMany();
  }

  async findOne(id: number): Promise<Type | undefined> {
    return await this.prisma.type.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    });
  }

  async update(id: number, updateTypeDto: any) {
    return await this.prisma.type.update({
      where: {
        id
      },
      data: updateTypeDto
    })
  }

  async remove(id: number) {
    return await this.prisma.type.delete({
      where: {
        id
      }
    });
  }
}
