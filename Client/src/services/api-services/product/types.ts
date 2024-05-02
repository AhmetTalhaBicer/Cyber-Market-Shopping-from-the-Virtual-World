export interface productCreateDTO {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  category_id: number;
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  category_id: number;
}

export interface productGetByIdDTO {
  product_id: number;
}

export interface productGetByCategory {
  categoryId: number;
}

export interface productUpdateDTO {
  product_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  category_id: number;
}

export interface productDeleteDTO {
  product_id: number;
}
