import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}
  async create(createServiceDto: any) {
    return await this.prisma.service.create({
      data: createServiceDto
    });
  }

  async findAll() {
    return await this.prisma.service.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.service.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateServiceDto: any) {
    return await this.prisma.service.update({
      data: updateServiceDto,
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.service.delete({
      where: {
        id
      }
    });
  }
}
