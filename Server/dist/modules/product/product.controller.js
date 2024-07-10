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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("../../utils/HttpExceptionFilter");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(createProductDto) {
        try {
            const newProduct = await this.productService.create(createProductDto);
            return {
                success: true,
                message: 'Product created successfully',
                result: newProduct,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create product',
                error: error.message,
            };
        }
    }
    async findAll() {
        try {
            const product = await this.productService.findAll();
            return {
                success: true,
                message: 'All products retrieved successfully.',
                result: product,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve products',
                error: error.message,
            };
        }
    }
    async findOne(id) {
        try {
            const product = await this.productService.findById(+id);
            return {
                success: true,
                message: 'Product retrieved successfully.',
                result: product,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve product',
                error: error.message,
            };
        }
    }
    async findByCategory(categoryId) {
        try {
            const products = await this.productService.findByCategory(+categoryId);
            return {
                success: true,
                message: 'Products retrieved successfully.',
                result: products,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve products',
                error: error.message,
            };
        }
    }
    async update(id, updateProductDto) {
        try {
            const updatedProduct = await this.productService.update(+id, updateProductDto);
            return {
                success: true,
                message: 'Product updated successfully.',
                result: updatedProduct,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to update product',
                error: error.message,
            };
        }
    }
    async remove(id) {
        try {
            const deletedProduct = await this.productService.remove(+id);
            return {
                success: true,
                message: 'Product deleted successfully.',
                result: deletedProduct,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to delete product',
                error: error.message,
            };
        }
    }
    async removeAll() {
        try {
            const deletedProducts = await this.productService.removeAll();
            return {
                success: true,
                message: 'All products deleted successfully.',
                result: deletedProducts,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to delete products',
                error: error.message,
            };
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create product',
        description: 'Create a new product',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The product has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all products.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the product.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get products by category' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the products.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete all products' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All products have been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeAll", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map