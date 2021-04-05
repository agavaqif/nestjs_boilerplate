import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './product.repository';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,ProductsRepository])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
