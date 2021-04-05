import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './entities/product.subscriber';
import { AuthModule } from 'src/shared/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductSubscriber]
})
export class ProductModule {}
