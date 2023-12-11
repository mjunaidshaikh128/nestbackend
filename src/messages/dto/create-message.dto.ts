import { Message } from "../entities/message.entity";

export class CreateMessageDto {
    content: string;
    senderId: number;
    receiverId: number

}
