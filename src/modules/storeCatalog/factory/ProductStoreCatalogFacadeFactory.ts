import { ProductStoreCatalogFacade } from "../facade";
import { ProductStoreCatalogRepository } from "../repository";
import { FindAllProductsUseCase } from "../useCase";
import { FindProductUseCase } from "../useCase/findProduct/FindProductUseCase";

export class ProductStoreCatalogFacadeFactory {
  static create(): ProductStoreCatalogFacade {
    const productRepository = new ProductStoreCatalogRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    const productFacade = new ProductStoreCatalogFacade({
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase,
    });

    return productFacade;
  }
}
