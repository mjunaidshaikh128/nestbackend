import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TypeModule } from './type/type.module';
import { OwnerModule } from './owner/owner.module';
import { LocationModule } from './location/location.module';
import { ServiceModule } from './service/service.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ItemModule } from './item/item.module';


@Module({
  imports: [AuthModule, UsersModule, CategoryModule, CloudinaryModule, TypeModule, OwnerModule, LocationModule, ServiceModule, EquipmentModule, ItemModule],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}
