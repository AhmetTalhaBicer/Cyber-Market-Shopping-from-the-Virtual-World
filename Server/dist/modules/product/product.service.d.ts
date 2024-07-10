import { PipeTransform } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
export declare class ProductService {
    private productRepository;
    private categoryService;
    constructor(productRepository: Repository<Product>, categoryService: CategoryService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(product_id: number): Promise<Product>;
    findByCategory(category_id: number): Promise<Product[]>;
    update(product_id: number, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(product_id: number): Promise<import("typeorm").DeleteResult>;
    removeByCategoryId(category_id: number): Promise<import("typeorm").DeleteResult>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
}
export declare class CategoryValidationPipe implements PipeTransform {
    transform(value: any): any;
}
