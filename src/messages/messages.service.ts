import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { classToClassFromExist } from 'class-transformer';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  messages: Message[] = [{name: 'Junaid', text: 'Hello World'}]
  clientToUser = {}

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {name: this.clientToUser[clientId], text: createMessageDto.content}
    // this.messages.push(message)

    const savedMessage = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        receiverId: createMessageDto.receiverId
      },
      include: {
        sender: true,
        receiver: true
      },

    })

    console.log("saved message",savedMessage);

    return savedMessage
  }

  async findAll(senderId: number, receiverId: number) {
    // console.log(senderId, receiverId);
    const allMessages = await this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: senderId },
          { receiverId: senderId }
        ],
      },
      include: {
        sender: true,
        receiver: true
      },
      orderBy: { createdAt: 'asc'}
    })
    console.log(allMessages);

    return allMessages;

  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name
    console.log(this.clientToUser[clientId]);
    console.log(this.clientToUser);

    return Object.values(this.clientToUser)
  }

  getClientName(clientId: string) {
    console.log("Client iD",clientId);
    console.log("From get client get name",this.clientToUser);
    return this.clientToUser[clientId]
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
