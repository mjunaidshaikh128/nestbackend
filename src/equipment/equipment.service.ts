import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EquipmentService {

  constructor(private prisma: PrismaService) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return 'This action adds a new equipment';
  }

  findAll() {
    return this.prisma.equipment.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
