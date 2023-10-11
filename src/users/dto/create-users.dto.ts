import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  id: number;
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  location: string;
}
