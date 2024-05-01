"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 49:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryValidationPipe = exports.ProductService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(21);
const product_entity_1 = __webpack_require__(43);
const category_service_1 = __webpack_require__(41);
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
    async removeAll() {
        return await this.productRepository.delete({});
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _b : Object])
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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("be351a3e5960c276bbf2")
/******/ })();
/******/ 
/******/ }
;