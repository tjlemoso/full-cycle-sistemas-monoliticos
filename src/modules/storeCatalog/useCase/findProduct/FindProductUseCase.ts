import { UseCaseInterface } from "../../../@shared";
import { ProductStoreCatalogGateway } from "../../gateway";
import { InputFindProductDto, OutputFindProductDto } from "./FindProductDto";

export class FindProductUseCase implements UseCaseInterface {
  private _productRepository: ProductStoreCatalogGateway;

  constructor(_productRepository: ProductStoreCatalogGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this._productRepository.find(input.id);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}
