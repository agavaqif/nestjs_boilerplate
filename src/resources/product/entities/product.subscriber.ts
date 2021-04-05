
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { AuthService } from 'src/shared/auth/service/auth.service';
import {
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
    Connection,
  } from 'typeorm';
  import { Product } from './product.entity';
  
  @Injectable()
  export class ProductSubscriber implements EntitySubscriberInterface {
  
    constructor(
      @InjectConnection() readonly connection: Connection,
      private authService: AuthService
    ) {    
      connection.subscribers.push(this);
    }
  
    listenTo() {
      return Product;
    }
  
    async beforeInsert(event: InsertEvent<Product>) {
        console.log("Before Insertong")
    };

    beforeUpdate(event: UpdateEvent<Product>) {
        console.log("Before Updaing")
    }
  
  }

