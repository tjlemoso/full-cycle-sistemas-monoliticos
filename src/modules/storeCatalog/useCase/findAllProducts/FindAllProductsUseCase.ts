import { UseCaseInterface } from "../../../@shared";
import { ProductStoreCatalogGateway } from "../../gateway";
import { InputFindAllProductsDto, OutputFindAllProductsDto } from "./FindAllProductsDto";

export class FindAllProductsUseCase implements UseCaseInterface {
  private _productRepository: ProductStoreCatalogGateway;

  constructor(_productRepository: ProductStoreCatalogGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: InputFindAllProductsDto): Promise<OutputFindAllProductsDto> {
    const products = await this._productRepository.findAll();

    return {
      products: products.map(product => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      }))
    }
  }
}
