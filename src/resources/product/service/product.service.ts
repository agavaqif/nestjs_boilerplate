import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {}

    public async findAll(): Promise<Product[]> {
        const products: Product[] = await this.productRepository.find();
        return products;
    }

    async findAllPaginated(options: IPaginationOptions): Promise<Pagination<Product>> {
        return paginate<Product>(this.productRepository, options);
      }

    public async findById(productId: number): Promise<Product> {
        const product = await this.productRepository.findOneOrFail(productId);
        return product;
    }

    public async create(createProductDto: CreateProductDto): Promise<Product> {
        // Need to create first to enable subscribers
        const product: Product = await this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }

    public async update(productId: number, updateProductDto: UpdateProductDto): Promise<boolean> {
        await this.productRepository.findOneOrFail(productId);
        const product = this.productRepository.create(updateProductDto);
        delete product.productId;
        await this.productRepository.update(productId, product);
        return true;
    }

    public async remove(productId: number): Promise<boolean> {
        const product: Product = await this.productRepository.findOneOrFail(productId);
        await this.productRepository.remove(product);
        return true;
    }
}
