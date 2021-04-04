import { Entity } from "typeorm";
import { BaseItemDto } from "./base-item.dto";

@Entity('item')
export class CreateItemDto extends BaseItemDto {}
