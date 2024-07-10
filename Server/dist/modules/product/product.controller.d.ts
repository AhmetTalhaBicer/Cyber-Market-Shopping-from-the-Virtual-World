import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/product.entity").Product;
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
        result: import("./entities/product.entity").Product[];
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
        result: import("./entities/product.entity").Product;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    findByCategory(categoryId: string): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/product.entity").Product[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        success: boolean;
        message: string;
        result: import("typeorm").UpdateResult;
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
        result: import("typeorm").DeleteResult;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    removeAll(): Promise<{
        success: boolean;
        message: string;
        result: import("typeorm").DeleteResult;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
}
