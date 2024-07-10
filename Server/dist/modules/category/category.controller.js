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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const HttpExceptionFilter_1 = require("../../utils/HttpExceptionFilter");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(createCategoryDto) {
        try {
            const newCategory = await this.categoryService.create(createCategoryDto);
            return {
                success: true,
                message: 'Category created successfully',
                result: newCategory,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create category',
                error: error.message,
            };
        }
    }
    async findAll() {
        try {
            const categories = await this.categoryService.findAll();
            return {
                success: true,
                message: 'All categories retrieved successfully.',
                result: categories,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve categories',
                error: error.message,
            };
        }
    }
    async findById(id) {
        try {
            const category = await this.categoryService.findById(id);
            return {
                success: true,
                message: 'Category retrieved successfully.',
                result: category,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve category',
                error: error.message,
            };
        }
    }
    async update(id, updateCategoryDto) {
        try {
            const updatedCategory = await this.categoryService.update(id, updateCategoryDto);
            return {
                success: true,
                message: 'Category updated successfully',
                result: updatedCategory,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to update category',
                error: error.message,
            };
        }
    }
    async remove(id) {
        try {
            const deletedCategory = await this.categoryService.remove(id);
            return {
                success: true,
                message: 'Category deleted successfully',
                result: deletedCategory,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to delete category',
                error: error.message,
            };
        }
    }
    async removeAll() {
        try {
            const deletedCategories = await this.categoryService.removeAll();
            return {
                success: true,
                message: 'All categories deleted successfully',
                result: deletedCategories,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to delete categories',
                error: error.message,
            };
        }
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create category',
        description: 'Create a new category',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The category has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all categories.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get category by id' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'id of category to find',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the category.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update category' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'id of category to update',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The category has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete category' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'id of category to delete',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The category has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete all categories' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All categories have been successfully deleted.',
    }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "removeAll", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('category'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map