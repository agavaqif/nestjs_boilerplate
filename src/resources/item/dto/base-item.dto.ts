import { IsNotEmpty } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity('item')
export class BaseItemDto {

    @IsNotEmpty()
    @Column()
    title: string;

    @Column({default:''})
    description: string;
}