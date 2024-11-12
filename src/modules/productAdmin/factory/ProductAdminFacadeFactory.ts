import { ProductAdminFacade } from "../facade/ProductAdminFacade";
import { ProductAdminRepository } from "../repository";
import { AddProductUseCase, CheckStockUseCase } from "../useCase";

export class ProductAdminFacadeFactory {
  static create() {
    const productRepository = new ProductAdminRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdminFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    });

    return productFacade;
  }
}
