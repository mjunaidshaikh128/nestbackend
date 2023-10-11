import { IsNotEmpty } from 'class-validator';


export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;
    
    description: string;
    status: string;
    image: string;
}
