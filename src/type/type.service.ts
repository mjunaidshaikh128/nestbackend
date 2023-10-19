import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from 'src/prisma.service';
import { Type } from '@prisma/client';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async create(createTypeDto: any): Promise<Type | undefined> {
    const { categoryid, ...rest } = createTypeDto;

    return await this.prisma.type.create({
      data: {
        ...rest,
        category: {
          connect: {
            id: +categoryid,
          },
        },
      },
    });
  }

  async findAll(): Promise<Type[] | undefined> {
    return await this.prisma.type.findMany();
  }

  async findOne(id: number): Promise<Type | undefined> {
    return await this.prisma.type.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  async update(uid: number, updateTypeDto: any) {
    const { id, categoryid, ...rest } = updateTypeDto;
    return await this.prisma.type.update({
      where: {
        id: uid,
      },
      data: {
        ...rest,
        category: {
          connect: {
            id: +categoryid,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.type.delete({
      where: {
        id,
      },
    });
  }
}
