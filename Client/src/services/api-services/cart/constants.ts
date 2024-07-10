export const Cart_Create = "/cart";
export const Cart_GetAll = "/cart";
export const Cart_AddProduct = (id: number) => `/cart/${id}/add-product`;
export const Cart_GetById = (id: number) => `/cart/${id}`;
export const Cart_Update = (id: number) => `/cart/${id}`;
export const Cart_Delete = (id: number) => `/cart/${id}`;
export const Cart_Total = (id: number) => `/cart/${id}/total`;
export const Cart_RemoveProduct = (id: number, productId: number) =>
  `/cart/${id}/products/${productId}`;
export const Cart_Clear = (id: number) => `/cart/${id}/products`;
