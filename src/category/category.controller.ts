import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private cloudinary: CloudinaryService) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }



  @Post()
  @UseInterceptors(FileInterceptor('image')) // use this and  @UploadedFile() image: Express.Multer.File tag in the argument
  create(@Body() createCategoryDto: any, @UploadedFile() image: Express.Multer.File) {

    // const newObj = {
    //   ...createCategoryDto,
    //   image
    // }

    return this.categoryService.create(createCategoryDto, image);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (Number.isNaN(+id)) {
      throw new HttpException('Invalid Id Type', HttpStatus.BAD_REQUEST);
    }
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    if (Number.isNaN(+id)) {
      throw new HttpException('Invalid Id Type', HttpStatus.BAD_REQUEST);
    }

    if ('id' in updateCategoryDto) {
      delete updateCategoryDto.id;
    }
    if ('name' in updateCategoryDto) {
      delete updateCategoryDto.name;
    }
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (Number.isNaN(+id)) {
      throw new HttpException('Invalid Id Type', HttpStatus.BAD_REQUEST);
    }

    return this.categoryService.remove(+id);
  }
}
