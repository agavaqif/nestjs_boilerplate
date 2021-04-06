import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('product')
export class Product {
     @PrimaryGeneratedColumn()
     productId: number;

     @Column()
     name: string;

     @Column()
     description: string;

     @Column()
     price: number;
}
