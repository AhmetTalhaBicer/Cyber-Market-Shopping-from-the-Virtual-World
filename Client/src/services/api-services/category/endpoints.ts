import http from "../../base";
import { ServerResponse } from "../../base/types";
import {
  Category_Create,
  Category_Delete,
  Category_GetAll,
  Category_GetById,
  Category_Update,
} from "./constants";
import {
  Category,
  categoryCreateDTO,
  categoryDeleteDTO,
  categoryGetByIdDTO,
  categoryUpdateDTO,
} from "./types";

// create new category
export const createCategory = async (data: categoryCreateDTO) => {
  return http.post(Category_Create, data);
};

// get all categories
export const getAllCategories = async (data: Category) => {
  return http.get<ServerResponse<Category[]>>(Category_GetAll, {
    params: data,
  });
};

// get category by id
export const getCategoryById = async (data: categoryGetByIdDTO) => {
  return http.get<ServerResponse<categoryGetByIdDTO>>(Category_GetById, {
    params: data,
  });
};

// update category
export const updateCategory = async (data: categoryUpdateDTO) => {
  return http.patch(Category_Update, data);
};

// delete category
export const deleteCategory = async (data: categoryDeleteDTO) => {
  return http.delete(Category_Delete, {
    params: data,
  });
};
