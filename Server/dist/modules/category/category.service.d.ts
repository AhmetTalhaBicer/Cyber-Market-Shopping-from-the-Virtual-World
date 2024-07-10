import { PipeTransform } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductService } from '../product/product.service';
export declare class CategoryService {
    private categoryRepository;
    private productService;
    constructor(categoryRepository: Repository<Category>, productService: ProductService);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(category_id: number): Promise<Category>;
    update(category_id: number, updateCategoryDto: UpdateCategoryDto): Promise<import("typeorm").UpdateResult>;
    remove(category_id: number): Promise<import("typeorm").DeleteResult>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
}
export declare class CategoryValidationPipe implements PipeTransform {
    private categoryService;
    constructor(categoryService: CategoryService);
    transform(value: any): Promise<any>;
}
