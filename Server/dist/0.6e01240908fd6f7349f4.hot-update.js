"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 55:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartValidationPipe = exports.CartService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(21);
const users_service_1 = __webpack_require__(20);
const cart_entity_1 = __webpack_require__(56);
const product_service_1 = __webpack_require__(49);
let CartService = class CartService {
    constructor(cartRepository, usersService, productService) {
        this.cartRepository = cartRepository;
        this.usersService = usersService;
        this.productService = productService;
    }
    async create(createCartDto) {
        const user = await this.usersService.findById(createCartDto.userId);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${createCartDto.userId} not found`);
        }
        const totalPrice = await this.calculateTotalPrice(createCartDto.items);
        const newCart = this.cartRepository.create({
            ...createCartDto,
            total: totalPrice,
            user: user,
        });
        const savedCart = await this.cartRepository.save(newCart);
        return savedCart;
    }
    async calculateTotalPrice(items) {
        let totalPrice = 0;
        for (const item of items) {
            const product = await this.productService.findById(item.productId);
            if (!product) {
                throw new common_1.NotFoundException(`Product with id ${item.productId} not found`);
            }
            totalPrice += product.price * item.quantity;
        }
        return totalPrice;
    }
    async findAll() {
        return await this.cartRepository.find();
    }
    async findById(cart_id) {
        const cart = await this.cartRepository.findOne({
            where: { cart_id },
        });
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${cart_id} not found`);
        }
        return cart;
    }
    async findByUser(user_id) {
        return await this.cartRepository.find({
            where: { user: { id: user_id } },
        });
    }
    async update(cart_id, updateCartDto) {
        const cart = await this.findById(cart_id);
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${cart_id} not found`);
        }
        const updatedCart = { ...cart, ...updateCartDto };
        return await this.cartRepository.save(updatedCart);
    }
    async remove(cart_id) {
        const cart = await this.findById(cart_id);
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${cart_id} not found`);
        }
        return await this.cartRepository.remove(cart);
    }
    async removeAll() {
        return await this.cartRepository.delete({});
    }
    async addItem(cart_id, item) {
        const cart = await this.findById(cart_id);
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${cart_id} not found`);
        }
        cart.items.push(item);
        await this.cartRepository.save(cart);
        return await this.calculateTotal(cart_id);
    }
    async removeItem(cart_id, item_id) {
        const cart = await this.findById(cart_id);
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${cart_id} not found`);
        }
        cart.items = cart.items.filter((item) => item.productId !== item_id);
        await this.cartRepository.save(cart);
        return await this.calculateTotal(cart_id);
    }
    async clear(cart_id) {
        const cart = await this.findById(cart_id);
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${cart_id} not found`);
        }
        cart.items = [];
        return await this.cartRepository.save(cart);
    }
    async calculateTotal(cart_id) {
        const cart = await this.findById(cart_id);
        if (!cart) {
            throw new common_1.NotFoundException(`Cart with id ${cart_id} not found`);
        }
        let total = 0;
        cart.items.forEach((item) => {
            total += item.quantity * item.productId;
        });
        cart.total = total;
        return await this.cartRepository.save(cart);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _c : Object])
], CartService);
let CartValidationPipe = class CartValidationPipe {
    transform(value) {
        this.validateRequiredFields(value);
        this.validateFieldTypes(value);
        this.validateItemsArray(value);
        return value;
    }
    validateRequiredFields(value) {
        const requiredFields = ['userId', 'items'];
        requiredFields.forEach((field) => {
            if (!value[field]) {
                throw new common_1.BadRequestException(`${field} is required`);
            }
        });
    }
    validateFieldTypes(value) {
        const fieldTypes = {
            userId: 'number',
            items: 'object',
        };
        for (const field in fieldTypes) {
            if (typeof value[field] !== fieldTypes[field]) {
                throw new common_1.BadRequestException(`${field} must be a ${fieldTypes[field]}`);
            }
        }
    }
    validateItemsArray(value) {
        if (!Array.isArray(value.items)) {
            throw new common_1.BadRequestException('Items must be an array');
        }
        value.items.forEach((item) => {
            if (typeof item.productId !== 'number' ||
                typeof item.quantity !== 'number') {
                throw new common_1.BadRequestException('Each item must have a productId and quantity of type number');
            }
        });
    }
};
exports.CartValidationPipe = CartValidationPipe;
exports.CartValidationPipe = CartValidationPipe = __decorate([
    (0, common_1.Injectable)()
], CartValidationPipe);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("58f5c8832c187364f4c5")
/******/ })();
/******/ 
/******/ }
;