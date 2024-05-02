import http from "../../base";
import { ServerResponse } from "../../base/types";
import {
  Product_Create,
  Product_Delete,
  Product_GetAll,
  Product_GetByCategory,
  Product_GetById,
  Product_Update,
} from "./constants";
import {
  Product,
  productCreateDTO,
  productDeleteDTO,
  productGetByCategory,
  productGetByIdDTO,
  productUpdateDTO,
} from "./types";

//create new product
export const createProduct = async (data: productCreateDTO) => {
  return http.post(Product_Create, data);
};

//get all products
export const getAllProducts = async (data: Product) => {
  return http.get<ServerResponse<Product[]>>(Product_GetAll, {
    params: data,
  });
};

//get product by id
export const getProductById = async (data: productGetByIdDTO) => {
  return http.get<ServerResponse<productGetByIdDTO[]>>(Product_GetById, {
    params: data,
  });
};

//get product by category
export const getProductByCategory = async (data: productGetByCategory) => {
  return http.get<ServerResponse<productGetByCategory[]>>(
    Product_GetByCategory,
    {
      params: data,
    }
  );
};

//update product
export const updateProduct = async (data: productUpdateDTO) => {
  return http.patch(Product_Update, data);
};

//delete product
export const deleteProduct = async (data: productDeleteDTO) => {
  return http.delete(Product_Delete, {
    params: data,
  });
};
