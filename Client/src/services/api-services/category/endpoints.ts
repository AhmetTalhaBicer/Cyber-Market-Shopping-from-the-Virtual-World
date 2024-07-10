import http from "../../base";
import { ServerResponse } from "../../base/types";
import {
  Category_Create,
  Category_Delete,
  Category_GetAll,
  Category_GetById,
  Category_Update,
} from "./constants";
import { Category, categoryCreateDTO, categoryUpdateDTO } from "./types";

// create new category
export const createCategory = async (data: categoryCreateDTO) => {
  return http.post(Category_Create, data);
};

// get all categories
export const getAllCategories = async () => {
  return http.get<ServerResponse<Category[]>>(Category_GetAll);
};

// get category by id
export const getCategoryById = async (category_id: number) => {
  return http.get<ServerResponse<number>>(Category_GetById(category_id));
};

// update category
export const updateCategory = async (
  category_id: number,
  data: categoryUpdateDTO
) => {
  return http.patch(Category_Update(category_id), data);
};

// delete category
export const deleteCategory = async (category_id: number) => {
  return http.delete<ServerResponse<number>>(Category_Delete(category_id));
};
