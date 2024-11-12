import { ProductAdminEntity } from "../domain";

export interface ProductAdminGatewayInterface {
  add(product: ProductAdminEntity): Promise<void>;
  find(id: string): Promise<ProductAdminEntity>;
}
