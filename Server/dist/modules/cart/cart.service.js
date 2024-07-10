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
exports.CartValidationPipe = exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const cart_entity_1 = require("./entities/cart.entity");
const product_service_1 = require("../product/product.service");
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        product_service_1.ProductService])
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
//# sourceMappingURL=cart.service.js.map