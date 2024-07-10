import { PipeTransform } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Cart } from './entities/cart.entity';
import { ProductService } from '../product/product.service';
export declare class CartService {
    private cartRepository;
    private usersService;
    private productService;
    constructor(cartRepository: Repository<Cart>, usersService: UsersService, productService: ProductService);
    create(createCartDto: CreateCartDto): Promise<Cart>;
    calculateTotalPrice(items: {
        productId: number;
        quantity: number;
    }[]): Promise<number>;
    findAll(): Promise<Cart[]>;
    findById(cart_id: number): Promise<Cart>;
    findByUser(user_id: number): Promise<Cart[]>;
    update(cart_id: number, updateCartDto: UpdateCartDto): Promise<{
        items: {
            productId: number;
            quantity: number;
        }[];
        cart_id: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
        user: import("../users/entities/users.entity").Users;
    } & Cart>;
    remove(cart_id: number): Promise<Cart>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    addItem(cart_id: number, item: {
        productId: number;
        quantity: number;
    }): Promise<Cart>;
    removeItem(cart_id: number, item_id: number): Promise<Cart>;
    clear(cart_id: number): Promise<Cart>;
    calculateTotal(cart_id: number): Promise<Cart>;
}
export declare class CartValidationPipe implements PipeTransform {
    transform(value: any): any;
    validateRequiredFields(value: any): void;
    validateFieldTypes(value: any): void;
    validateItemsArray(value: any): void;
}
