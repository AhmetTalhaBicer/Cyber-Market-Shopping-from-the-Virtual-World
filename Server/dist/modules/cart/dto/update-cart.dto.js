"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cart_dto_1 = require("./create-cart.dto");
class UpdateCartDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_cart_dto_1.CreateCartDto, ['userId'])) {
}
exports.UpdateCartDto = UpdateCartDto;
//# sourceMappingURL=update-cart.dto.js.map