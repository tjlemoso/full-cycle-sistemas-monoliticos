import { UseCaseInterface } from "../../@shared";
import { InputAddProductAdminFacadeDto, InputCheckProductAdminFacadeDto, OutputCheckProductAdminFacadeDto } from "./ProductAdminFacadeDto";
import { ProductAdminFacadeInterface } from "./ProductAdminFacadeInterface";

interface UseCases {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export class ProductAdminFacade implements ProductAdminFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkUseCase: UseCaseInterface;

  constructor({ addUseCase, stockUseCase }: UseCases) {
    this._addUseCase = addUseCase;
    this._checkUseCase = stockUseCase;
  }

  addProduct(input: InputAddProductAdminFacadeDto): Promise<void> {
    const inputFacade = {
      id: input.id,
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    return this._addUseCase.execute(inputFacade);
  }
  checkStock(input: InputCheckProductAdminFacadeDto): Promise<OutputCheckProductAdminFacadeDto> {
    const inputFacade = {
      productId: input.productId,
    };

    return this._checkUseCase.execute(inputFacade);
  }

}
