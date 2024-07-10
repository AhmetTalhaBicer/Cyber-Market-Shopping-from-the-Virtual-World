export interface categoryCreateDTO {
  name: string;
  image_url: string;
}

export interface Category {
  category_id: number;
  name: string;
  image_url: string;
}

export interface categoryUpdateDTO {
  name: string;
  image_url: string;
}
