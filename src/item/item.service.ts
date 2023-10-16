import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async mapImgs(images: Array<Express.Multer.File>) {
    const imagesUrls: string[] = [];
    images.map(async (image) => {
      const imgResponse = await this.cloudinary.uploadImage(image);
      console.log('Image Response', imgResponse.secure_url);
      imagesUrls.push(imgResponse.secure_url);
    });
    return imagesUrls;
  }

  async create(createItemDto: any, images: Array<Express.Multer.File>) {
    let imagesUrls: string[] = [];
    const equipmentIds: any = [];
    const serviceIds: any = [];
    const PromiseMaps = images.map(async (image) => {
      const imgResponse = await this.cloudinary.uploadImage(image);
      imagesUrls.push(imgResponse.secure_url);
    });
    Promise.all(PromiseMaps).then(async () => {
      const dbCreateItemDto = { ...createItemDto, images: imagesUrls };
      const {
        categoryid,
        typeId,
        location,
        owner,
        equipments,
        services,
        ...rest
      } = dbCreateItemDto;
      equipments.map((equipment) => {
        equipmentIds.push({ id: equipment.id });
      });
      services.map((service) => {
        serviceIds.push({ id: service.id });
      });
      return await this.prisma.item.create({
        data: {
          ...rest,
          category: {
            connect: {
              id: +categoryid,
            },
          },
          type: {
            connect: {
              id: +typeId,
            },
          },
          location: {
            connect: {
              id: +location,
            },
          },
          owner: {
            connect: {
              id: +owner,
            },
          },
          equipments: {
            connect: equipmentIds,
          },
          services: {
            connect: serviceIds,
          },
        },
      });
    });
  }

  async findAll() {
    return await this.prisma.item.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        type: true,
        owner: true,
        location: true,
        equipments: true,
        services: true,
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return await this.prisma.item.update({
      where: {
        id,
      },
      data: updateItemDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}