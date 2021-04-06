import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { AuthService } from 'src/shared/auth/service/auth.service';
import {
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
    Connection,
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Injectable()
  export class UserSubscriber implements EntitySubscriberInterface {
  
    constructor(
      @InjectConnection() readonly connection: Connection,
      private authService: AuthService
    ) {
        
      connection.subscribers.push(this);
    }
  
    listenTo() {
      return User;
    }
  
    async beforeInsert(event: InsertEvent<User>) {
        if(event.entity.email != undefined)event.entity.email = event.entity.email.toLocaleLowerCase();    
        if(event.entity.password != undefined) {
            event.entity.password = await  this.authService.hashPassword(event.entity.password);
        }

    };

    beforeUpdate(event: UpdateEvent<User>) {
        if(event.entity.email != undefined)event.entity.email = event.entity.email.toLocaleLowerCase();    
        if(event.entity.password != undefined) this.authService.hashPassword(event.entity.password);
    }
  
  }
