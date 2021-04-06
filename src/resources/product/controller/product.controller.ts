import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Controller('/api/product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  public async findAll(): Promise<Product[]> {
      return await this.productService.findAll();
  }

  @Get('paginate')
  public async findAllPaginated(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10
  ) {
    return this.productService.findAllPaginated({limit: Number(limit), page: Number(page)})
  }

  @Get('/:productId')
  public async findById(@Param('productId') productId: number): Promise<Product> {
      return await this.productService.findById(productId);
  }

  @Post()
  public async create( @Body() createProductDto: CreateProductDto): Promise<Product> {
      return await this.productService.create(createProductDto);
  }

  @Patch('/:productId')
  public async update(
      @Body() updateProductDto: UpdateProductDto,
      @Param('productId') productId: number,
  ): Promise<boolean> {
        return this.productService.update(productId, updateProductDto);
  }

  @Delete('/:productId')
  public async delete(@Param('productId') productId: number): Promise<boolean> {
      return this.productService.remove(productId)
  }
}

