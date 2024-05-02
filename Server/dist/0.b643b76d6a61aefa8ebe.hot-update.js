"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 57:
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
exports.CartController = void 0;
const common_1 = __webpack_require__(6);
const cart_service_1 = __webpack_require__(55);
const create_cart_dto_1 = __webpack_require__(58);
const update_cart_dto_1 = __webpack_require__(59);
const swagger_1 = __webpack_require__(28);
const HttpExceptionFilter_1 = __webpack_require__(47);
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async create(createCartDto) {
        try {
            const newCart = await this.cartService.create(createCartDto);
            return {
                success: true,
                message: 'Cart created successfully',
                cart: newCart,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create cart',
                error: error.message,
            };
        }
    }
    async addItem(cart_id, item) {
        try {
            const product = await this.cartService.addItem(cart_id, item);
            return {
                success: true,
                message: 'Item added successfully',
                product: product,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to add item',
                error: error.message,
            };
        }
    }
    async findAll() {
        try {
            const carts = await this.cartService.findAll();
            return {
                success: true,
                message: 'Carts retrieved successfully',
                carts: carts,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve carts',
                error: error.message,
            };
        }
    }
    async findOne(id) {
        try {
            const cart = await this.cartService.findById(+id);
            return {
                success: true,
                message: 'Cart retrieved successfully',
                cart: cart,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve cart',
                error: error.message,
            };
        }
    }
    async calculateTotal(cart_id) {
        try {
            const calculatedTotal = await this.cartService.calculateTotal(cart_id);
            return {
                success: true,
                message: 'Total price calculated successfully',
                total: calculatedTotal,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to calculate total price',
                error: error.message,
            };
        }
    }
    async update(id, updateCartDto) {
        try {
            const updatedCart = await this.cartService.update(+id, updateCartDto);
            return {
                success: true,
                message: 'Cart updated successfully',
                cart: updatedCart,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to update cart',
                error: error.message,
            };
        }
    }
    async remove(id) {
        try {
            await this.cartService.remove(+id);
            return {
                success: true,
                message: 'Cart deleted successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to delete cart',
                error: error.message,
            };
        }
    }
    async removeItem(cart_id, item_id) {
        try {
            const product = await this.cartService.removeItem(cart_id, item_id);
            return {
                success: true,
                message: 'Item removed successfully',
                product: product,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to remove item',
                error: error.message,
            };
        }
    }
    async clear(cart_id) {
        return this.cartService.clear(cart_id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new cart' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The cart has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    (0, common_1.UsePipes)(new cart_service_1.CartValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_cart_dto_1.CreateCartDto !== "undefined" && create_cart_dto_1.CreateCartDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/add-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Add an product to a cart' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully added.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all carts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all carts.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a cart by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the cart.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/total'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate total price of a cart' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The total price has been successfully calculated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "calculateTotal", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a cart' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The cart has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_cart_dto_1.UpdateCartDto !== "undefined" && update_cart_dto_1.UpdateCartDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a cart' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The cart has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/products/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove an product from a cart' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The item has been successfully removed.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart or product not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('itemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(':id/items'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear all items from a cart' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The cart has been successfully cleared.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clear", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [typeof (_a = typeof cart_service_1.CartService !== "undefined" && cart_service_1.CartService) === "function" ? _a : Object])
], CartController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("aa65e9e35dabd305d4e6")
/******/ })();
/******/ 
/******/ }
;