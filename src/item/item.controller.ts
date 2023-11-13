import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { Item } from '@prisma/client';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createItemDto: any,
  ) {
    const { equipments, services } = createItemDto;
    const parsedEquipments = JSON.parse(equipments);
    const parsedServices = JSON.parse(services);
    return this.itemService.create({ ...createItemDto, equipments: parsedEquipments, services: parsedServices }, images);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('findByFilter')
  async findByFilter(@Query() query) {
    // return query
    return await this.itemService.filterData(query)
  }

  @Get('search')
  async search(@Query() query) {
    // return query
    return await this.itemService.searchData(query)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  update(@Param('id') id: string, @Body() updateItemDto: any, @UploadedFiles() images: Array<Express.Multer.File>) {
    return this.itemService.update(+id, updateItemDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }

}
