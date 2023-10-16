import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OwnerService {

  constructor(private prisma: PrismaService) {}
  async create(createOwnerDto: any) {
    const {rating} = createOwnerDto
    return await this.prisma.owner.create({
      data: {...createOwnerDto, rating: parseFloat(rating)}
    })
  }

  async findAll() {
    return await this.prisma.owner.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.owner.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateOwnerDto: any) {
    const {rating} = updateOwnerDto

    return await this.prisma.owner.update({
      where: {
        id
      },
      data: {...updateOwnerDto, rating: parseFloat(rating)}
    });
  }

  async remove(id: number) {
    return await this.prisma.owner.delete({
      where: {
        id
      }
    });
  }
}
