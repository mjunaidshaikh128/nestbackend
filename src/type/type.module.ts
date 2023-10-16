import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TypeController],
  providers: [TypeService, PrismaService],
})
export class TypeModule {}
