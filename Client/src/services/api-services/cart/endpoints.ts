import http from "../../base";
import { ServerResponse } from "../../base/types";
import {
  Cart_AddProduct,
  Cart_Clear,
  Cart_Create,
  Cart_Delete,
  Cart_GetAll,
  Cart_GetById,
  Cart_RemoveProduct,
  Cart_Total,
  Cart_Update,
} from "./constants";
import {
  CartAddProductDTO,
  CartClearDTO,
  CartCreateDTO,
  CartDTO,
  CartDeleteDTO,
  CartGetByIdDTO,
  CartRemoveProductDTO,
  CartTotalDTO,
  CartUpdateDTO,
} from "./types";

//create new cart
export const createCart = async (data: CartCreateDTO) => {
  return http.post(Cart_Create, data);
};

//get all carts
export const getAllCarts = async (data: CartDTO) => {
  return http.get<ServerResponse<CartDTO[]>>(Cart_GetAll, {
    params: data,
  });
};

//get cart by id
export const getCartById = async (data: CartGetByIdDTO) => {
  return http.get<ServerResponse<CartGetByIdDTO[]>>(Cart_GetById, {
    params: data,
  });
};

// add product to cart
export const addProductToCart = async (data: CartAddProductDTO) => {
  return http.post(Cart_AddProduct, data);
};

// update cart
export const updateCart = async (data: CartUpdateDTO) => {
  return http.patch(Cart_Update, data);
};

//delete cart
export const deleteCart = async (data: CartDeleteDTO) => {
  return http.delete(Cart_Delete, {
    params: data,
  });
};

// get total of cart
export const getTotal = async (data: CartTotalDTO) => {
  return http.get<ServerResponse<CartTotalDTO[]>>(Cart_Total, {
    params: data,
  });
};

// remove product from cart
export const removeProduct = async (data: CartRemoveProductDTO) => {
  return http.delete(Cart_RemoveProduct, {
    params: data,
  });
};

//clear cart
export const clearCart = async (data: CartClearDTO) => {
  return http.delete(Cart_Clear, {
    params: data,
  });
};
