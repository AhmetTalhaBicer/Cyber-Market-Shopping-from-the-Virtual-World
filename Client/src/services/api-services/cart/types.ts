export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartCreateDTO {
  userId: number;
  items: CartItem[];
}

export interface CartDTO {
  cart_id: number;
  items: CartItem[];
  total: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartAddProductDTO {
  productId: number;
  items: CartItem[];
}

export interface CartGetByIdDTO {
  id: number;
}

export interface CartUpdateDTO {
  cart_id: number;
  items: CartItem[];
}

export interface CartDeleteDTO {
  cart_id: number;
}

export interface CartTotalDTO {
  cart_id: number;
}

export interface CartRemoveProductDTO {
  cart_id: number;
  productId: number;
}

export interface CartClearDTO {
  cart_id: number;
}
