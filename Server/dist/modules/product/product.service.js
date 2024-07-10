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
exports.CategoryValidationPipe = exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const category_service_1 = require("../category/category.service");
const category_entity_1 = require("../category/entities/category.entity");
let ProductService = class ProductService {
    constructor(productRepository, categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }
    async create(createProductDto) {
        const category = await this.categoryService.findById(createProductDto.category_id);
        if (!category) {
            throw new common_1.NotFoundException(`Category with id ${createProductDto.category_id} not found`);
        }
        const newProduct = this.productRepository.create(createProductDto);
        newProduct.category = category;
        return await this.productRepository.save(newProduct);
    }
    async findAll() {
        return await this.productRepository.find();
    }
    async findById(product_id) {
        const product = await this.productRepository.findOne({
            where: { product_id },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${product_id} not found`);
        }
        return product;
    }
    async findByCategory(category_id) {
        return await this.productRepository.find({
            where: { category: { category_id } },
        });
    }
    async update(product_id, updateProductDto) {
        const updateResult = await this.productRepository.update(product_id, updateProductDto);
        if (updateResult.affected === 0) {
            throw new common_1.NotFoundException(`Product with id ${product_id} not found`);
        }
        return updateResult;
    }
    async remove(product_id) {
        const deleteResult = await this.productRepository.delete(product_id);
        if (deleteResult.affected === 0) {
            throw new common_1.NotFoundException(`Product with id ${product_id} not found`);
        }
        return deleteResult;
    }
    async removeByCategoryId(category_id) {
        return await this.productRepository
            .createQueryBuilder()
            .delete()
            .where('category_id = :category_id', { category_id })
            .execute();
    }
    async removeAll() {
        return await this.productRepository.delete({});
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_service_1.CategoryService])
], ProductService);
let CategoryValidationPipe = class CategoryValidationPipe {
    transform(value) {
        const requiredFields = [
            'name',
            'description',
            'price',
            'quantity',
            'image_url',
            'category_id',
        ];
        const fieldTypes = {
            name: 'string',
            description: 'string',
            price: 'number',
            quantity: 'number',
            image_url: 'string',
            category_id: 'number',
        };
        requiredFields.forEach((field) => {
            if (!value[field]) {
                throw new common_1.BadRequestException(`${field} is required`);
            }
            if (typeof value[field] !== fieldTypes[field]) {
                throw new common_1.BadRequestException(`${field} must be a ${fieldTypes[field]}`);
            }
        });
        if (value.price <= 0) {
            throw new common_1.BadRequestException('Price must be a positive number');
        }
        if (value.quantity < 0) {
            throw new common_1.BadRequestException('Quantity must be a non-negative number');
        }
        return value;
    }
};
exports.CategoryValidationPipe = CategoryValidationPipe;
exports.CategoryValidationPipe = CategoryValidationPipe = __decorate([
    (0, common_1.Injectable)()
], CategoryValidationPipe);
//# sourceMappingURL=product.service.js.map