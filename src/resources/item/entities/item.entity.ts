import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseItemDto } from "../dto/base-item.dto";

@Entity('item')
export class Item extends BaseItemDto {

    @PrimaryGeneratedColumn()
    item_id: number
}
