import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: any) {
    const {itemId, checkInDate, checkOutDate} = createBookingDto
    const isConflict = await this.bookingService.isBookingConflict(itemId, checkInDate, checkOutDate)
    if (isConflict) throw new HttpException("Booking Conflict: The requested dates are not available", HttpStatus.CONFLICT)
    return this.bookingService.create(createBookingDto);
  // return {msg: "Booking created successfully"}
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookingDto: any) {
    const {itemId, checkInDate, checkOutDate} = updateBookingDto
    // console.log(updateBookingDto);
    const isConflict = await this.bookingService.isBookingConflict(itemId, checkInDate, checkOutDate, +id)
    if (isConflict) throw new HttpException("Booking Conflict: The requested dates are not available", HttpStatus.CONFLICT)

    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
