import { ProductStoreCatalogEntity } from "../domain";

export interface ProductStoreCatalogGateway {
  findAll(): Promise<ProductStoreCatalogEntity[]>;
  find(id: string): Promise<ProductStoreCatalogEntity>;
}
