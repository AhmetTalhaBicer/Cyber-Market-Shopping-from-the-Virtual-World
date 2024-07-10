"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidationPipe = exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const product_service_1 = require("../product/product.service");
let CategoryService = class CategoryService {
    constructor(categoryRepository, productService) {
        this.categoryRepository = categoryRepository;
        this.productService = productService;
    }
    async create(createCategoryDto) {
        const newCategory = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(newCategory);
    }
    async findAll() {
        return await this.categoryRepository.find();
    }
    async findById(category_id) {
        const category = await this.categoryRepository.findOne({
            where: { category_id },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with id ${category_id} not found`);
        }
        return category;
    }
    async update(category_id, updateCategoryDto) {
        const updateResult = await this.categoryRepository.update(category_id, updateCategoryDto);
        if (updateResult.affected === 0) {
            throw new common_1.NotFoundException(`Category with id ${category_id} not found`);
        }
        return updateResult;
    }
    async remove(category_id) {
        await this.productService.removeByCategoryId(category_id);
        const deleteResult = await this.categoryRepository.delete(category_id);
        if (deleteResult.affected === 0) {
            throw new common_1.NotFoundException(`Category with id ${category_id} not found`);
        }
        return deleteResult;
    }
    async removeAll() {
        return await this.categoryRepository.delete({});
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService])
], CategoryService);
let CategoryValidationPipe = class CategoryValidationPipe {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async transform(value) {
        const requiredFields = ['name', 'image_url'];
        const fieldTypes = {
            name: 'string',
            image_url: 'string',
        };
        requiredFields.forEach((field) => {
            if (!value[field]) {
                throw new common_1.BadRequestException(`${field} is required`);
            }
            if (typeof value[field] !== fieldTypes[field]) {
                throw new common_1.BadRequestException(`${field} must be a ${fieldTypes[field]}`);
            }
        });
        return value;
    }
};
exports.CategoryValidationPipe = CategoryValidationPipe;
exports.CategoryValidationPipe = CategoryValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [CategoryService])
], CategoryValidationPipe);
//# sourceMappingURL=category.service.js.map