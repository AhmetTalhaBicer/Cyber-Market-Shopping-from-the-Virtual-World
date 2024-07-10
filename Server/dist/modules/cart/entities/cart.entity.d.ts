import { Users } from 'src/modules/users/entities/users.entity';
export declare class Cart {
    cart_id: number;
    items: Array<{
        productId: number;
        quantity: number;
    }>;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    user: Users;
}
