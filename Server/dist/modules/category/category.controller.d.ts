import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/category.entity").Category;
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
        result: import("./entities/category.entity").Category[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    findById(id: number): Promise<{
        success: boolean;
        message: string;
        result: import("./entities/category.entity").Category;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
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
    remove(id: number): Promise<{
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
