import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, Category, Users])],
  controllers: [CartController],
  providers: [CartService, ProductService, UsersService, CategoryService],
  exports: [CartService],
})
export class CartModule {}
