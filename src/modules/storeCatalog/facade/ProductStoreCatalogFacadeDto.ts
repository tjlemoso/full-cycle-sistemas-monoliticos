export interface InputFindProductStoreCatalogFacadeDto {
  id: string;
}

export interface OutputFindProductStoreCatalogFacadeDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

type Product = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
};

export interface OutputFindAllProductStoreCatalogFacadeDto {
  products: Product[];
}
