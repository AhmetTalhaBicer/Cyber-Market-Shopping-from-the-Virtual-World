import { Product } from 'src/modules/product/entities/product.entity';
export declare class Category {
    category_id: number;
    name: string;
    image_url: string;
    products: Product[];
}
