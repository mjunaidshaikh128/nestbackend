import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EquipmentService {

  constructor(private prisma: PrismaService) {}

  async create(createEquipmentDto: any) {
    return await this.prisma.equipment.create({
      data: createEquipmentDto
    });
  }

  async findAll() {
    return await this.prisma.equipment.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.equipment.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateEquipmentDto: any) {
    return await this.prisma.equipment.update({
      data: updateEquipmentDto,
      where: {
        id
      }
    }
    )
  }

  async remove(id: number) {
    return await this.prisma.equipment.delete({
      where: {
        id
      }
    });
  }
}
