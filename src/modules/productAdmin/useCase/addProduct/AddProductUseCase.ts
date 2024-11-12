import { Id, UseCaseInterface } from "../../../@shared";
import { ProductAdminEntity } from "../../domain";
import { ProductAdminGatewayInterface } from "../../gateway";
import { InputAddProductDto, OutputAddProductDto } from "./AddProductDto";

export class AddProductUseCase implements UseCaseInterface {
  private _productRepository: ProductAdminGatewayInterface;

  constructor(_productRepository: ProductAdminGatewayInterface) {
    this._productRepository = _productRepository;
  }

  async execute(input: InputAddProductDto): Promise<OutputAddProductDto> {
    const inputProduct = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    }

    const product = new ProductAdminEntity(inputProduct);
    await this._productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
