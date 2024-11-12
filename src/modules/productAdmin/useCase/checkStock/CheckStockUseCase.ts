import { UseCaseInterface } from "../../../@shared";
import { ProductAdminGatewayInterface } from "../../gateway";
import { InputCheckStockDto, OutputCheckStockDto } from "./CheckStockDto";

export class CheckStockUseCase implements UseCaseInterface {
  private _productRepository: ProductAdminGatewayInterface;

  constructor(_productRepository: ProductAdminGatewayInterface) {
    this._productRepository = _productRepository;
  }

  async execute(input: InputCheckStockDto): Promise<OutputCheckStockDto> {
    const product = await this._productRepository.find(input.productId);

    return {
      productId: product.id.id,
      stock: product.stock
    }
  }
}
