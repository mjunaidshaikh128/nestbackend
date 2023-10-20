import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';
import { Booking } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async isBookingConflict(
    itemId: number,
    startDate: Date,
    endDate: Date,
    id?: number,
  ): Promise<boolean> {
    if (id) {
      const existingBooking = await this.prisma.booking.findFirst({
        where: {
          itemId,
          NOT: {
            id,
          },
          OR: [
            {
              AND: [
                { checkInDate: { lte: startDate } },
                { checkOutDate: { gte: startDate } },
              ],
            },
            {
              AND: [
                { checkInDate: { lte: endDate } },
                { checkOutDate: { gte: endDate } },
              ],
            },
          ],
        },
      });

      return !!existingBooking; // Return true if a conflicting booking exists
    }
    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        itemId,
        OR: [
          {
            AND: [
              { checkInDate: { lte: startDate } },
              { checkOutDate: { gte: startDate } },
            ],
          },
          {
            AND: [
              { checkInDate: { lte: endDate } },
              { checkOutDate: { gte: endDate } },
            ],
          },
        ],
      },
    });

    return !!existingBooking; // Return true if a conflicting booking exists
  }
  async create(createBookingDto: any) {
    const { itemId, userId, ...rest } = createBookingDto;
    try {
      const booking = await this.prisma.booking.create({
        data: {
          ...rest,
          item: {
            connect: {
              id: itemId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return booking;
    } catch (err) {
      console.log(err);
      throw new HttpException(`Error: ${err}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Booking[]> {
    return await this.prisma.booking.findMany();
  }

  async findOne(id: number): Promise<Booking> {
    return await this.prisma.booking.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBookingDto: any) {
    const { itemId, userId, ...rest } = updateBookingDto;
    try {
      const updatedBooking = await this.prisma.booking.update({
        data: {
          ...rest,
          item: {
            connect: {
              id: itemId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
        where: {
          id,
        },
      });
      return updatedBooking

    } catch (err) {
      throw new HttpException(`Error: ${err}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<Booking> {
    return await this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}
