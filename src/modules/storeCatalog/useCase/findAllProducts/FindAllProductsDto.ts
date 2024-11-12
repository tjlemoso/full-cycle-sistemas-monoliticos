type Product = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
};

export interface InputFindAllProductsDto {}

export interface OutputFindAllProductsDto {
  products: Product[];
}
