import { Repository, EntityRepository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

    public async findAll(): Promise<Product[]> {
        return await this.find({});
    } 

    public async findById(productId: number): Promise<Product> {
        return await this.findOne(productId);
    }

    public async createProduct(
        createProductDto: CreateProductDto,
    ): Promise<Product> {
        const { name, description, price } = createProductDto;
        const product = new Product();
        product.name = name;
        product.description = description;
        product.price = price;

        await this.save(product);
        return product;
    }

    public async editProduct(
        productId: number,
        updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        const { name, description, price } = updateProductDto;
        const product = await this.findOne(productId);
        product.name = name;
        product.description = description;
        product.price = price;
        await this.save(product);

        return product;
    }

    public async destroy(productId: number): Promise<void> {
        const product = await this.findOne(productId);
        await this.remove(product);
    } 
}



