import { Category } from 'src/modules/category/entities/category.entity';
export declare class Product {
    product_id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image_url: string;
    category: Category;
}
