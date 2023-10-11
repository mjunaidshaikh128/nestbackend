import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [AuthModule, UsersModule, CategoryModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}
