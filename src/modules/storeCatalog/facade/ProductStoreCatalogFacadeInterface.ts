import { InputFindProductStoreCatalogFacadeDto, OutputFindAllProductStoreCatalogFacadeDto, OutputFindProductStoreCatalogFacadeDto } from "./ProductStoreCatalogFacadeDto";

export interface ProductStoreCatalogFacadeInterface {
  find(input: InputFindProductStoreCatalogFacadeDto): Promise<OutputFindProductStoreCatalogFacadeDto>;
  findAll(): Promise<OutputFindAllProductStoreCatalogFacadeDto>;
}
