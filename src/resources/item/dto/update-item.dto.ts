import { PartialType } from '@nestjs/mapped-types';
import { Entity } from 'typeorm';
import { BaseItemDto } from './base-item.dto';
import { CreateItemDto } from './create-item.dto';

@Entity('item')
export class UpdateItemDto extends PartialType(BaseItemDto) {}
