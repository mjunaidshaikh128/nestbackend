import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Category } from './entities/category.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File): Promise<any> {
    const imgResponse = await this.uploadImageToCloudinary(image);
    // console.log(imgResponse);
    const newCategory = {
      data: {
        ...createCategoryDto,
        image: imgResponse.secure_url
      }
    }
    // return newCategory
    try {
      const category = await this.prisma.category.create(newCategory);

      return category;
    } catch (err) { 
      throw new HttpException('Invalid request data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    if (!categories) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Categories not found');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
    return category;
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (category) {
      await this.prisma.category.delete({
        where: {
          id,
        },
      });
    }
    return category;
  }
}
