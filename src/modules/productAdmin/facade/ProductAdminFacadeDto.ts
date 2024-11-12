export interface InputAddProductAdminFacadeDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface InputCheckProductAdminFacadeDto {
  productId: string;
}

export interface OutputCheckProductAdminFacadeDto {
  productId: string;
  stock: number;
}
