import { InputAddProductAdminFacadeDto, InputCheckProductAdminFacadeDto, OutputCheckProductAdminFacadeDto } from "./ProductAdminFacadeDto";

export interface ProductAdminFacadeInterface {
  addProduct(input: InputAddProductAdminFacadeDto): Promise<void>;
  checkStock(input: InputCheckProductAdminFacadeDto): Promise<OutputCheckProductAdminFacadeDto>;
}
