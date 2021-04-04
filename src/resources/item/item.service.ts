import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>
  ){}

  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.save(createItemDto);
  }

  findAll() {
    return this.itemRepository.find();
  }

  paginate(options: IPaginationOptions) {
    return paginate<Item>(this.itemRepository, options);
  }

  findOne(id: number) {
    return  this.itemRepository.findOneOrFail({item_id:id})
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.itemRepository.findOneOrFail({item_id:id});
    await this.itemRepository.update(id, this.itemRepository.create(updateItemDto));
    return true;
  }

  async remove(id: number) {
    await this.itemRepository.findOneOrFail({item_id:id});
    await this.itemRepository.delete({item_id: id});
    return true;
  }
}
