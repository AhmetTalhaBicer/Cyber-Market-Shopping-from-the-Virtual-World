export const Product_Create = "/product";
export const Product_GetAll = "/product";
export const Product_GetById = (id: number) => `/product/${id}`;
export const Product_GetByCategory = (categoryId: number) =>
  `/product/category/${categoryId}`;
export const Product_Update = (id: number) => `/product/${id}`;
export const Product_Delete = (id: number) => `/product/${id}`;
