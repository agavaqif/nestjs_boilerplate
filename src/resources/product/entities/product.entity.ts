import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
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
