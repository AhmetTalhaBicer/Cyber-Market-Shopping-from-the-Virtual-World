"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 54:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartModule = void 0;
const common_1 = __webpack_require__(6);
const cart_service_1 = __webpack_require__(55);
const cart_controller_1 = __webpack_require__(57);
const cart_entity_1 = __webpack_require__(56);
const typeorm_1 = __webpack_require__(11);
const users_entity_1 = __webpack_require__(22);
const users_service_1 = __webpack_require__(20);
const product_entity_1 = __webpack_require__(43);
const product_service_1 = __webpack_require__(49);
const category_service_1 = __webpack_require__(41);
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart, product_entity_1.Product, users_entity_1.Users])],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService, product_service_1.ProductService, users_service_1.UsersService, category_service_1.CategoryService],
        exports: [cart_service_1.CartService],
    })
], CartModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("262b29c097c12afb4b53")
/******/ })();
/******/ 
/******/ }
;