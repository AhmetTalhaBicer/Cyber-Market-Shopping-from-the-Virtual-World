import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto): Promise<{
        success: boolean;
        message: string;
        cart: import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        cart?: undefined;
    }>;
    addItem(cart_id: number, item: {
        productId: number;
        quantity: number;
    }): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/cart.entity").Cart[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    calculateTotal(cart_id: number): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    update(id: string, updateCartDto: UpdateCartDto): Promise<{
        success: boolean;
        message: string;
        result: {
            items: {
                productId: number;
                quantity: number;
            }[];
            cart_id: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            user: import("../users/entities/users.entity").Users;
        } & import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    removeItem(cart_id: number, item_id: number): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    clear(cart_id: number): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/cart.entity").Cart;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
}
