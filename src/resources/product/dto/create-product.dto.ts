import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
