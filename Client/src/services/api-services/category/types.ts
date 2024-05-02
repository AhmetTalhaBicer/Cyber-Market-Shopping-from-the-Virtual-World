export interface categoryCreateDTO {
  name: string;
  image_url: string;
}

export interface Category {
  category_id: number;
  name: string;
  image_url: string;
}

export interface categoryGetByIdDTO {
  category_id: number;
}

export interface categoryUpdateDTO {
  category_id: number;
  name: string;
  image_url: string;
}

export interface categoryDeleteDTO {
  category_id: number;
}
