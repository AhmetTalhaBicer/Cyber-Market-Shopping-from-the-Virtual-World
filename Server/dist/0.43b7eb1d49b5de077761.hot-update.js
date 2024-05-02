"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 58:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCartDto = void 0;
const swagger_1 = __webpack_require__(28);
const class_validator_1 = __webpack_require__(29);
class CreateCartDto {
}
exports.CreateCartDto = CreateCartDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 130 }),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                productId: 101,
                quantity: 10,
            },
        ],
    }),
    __metadata("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
], CreateCartDto.prototype, "items", void 0);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1f4085a3bbc06180f36c")
/******/ })();
/******/ 
/******/ }
;