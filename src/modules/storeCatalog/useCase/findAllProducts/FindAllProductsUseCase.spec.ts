import { Id } from "../../../@shared";
import { ProductStoreCatalogEntity } from "../../domain";
import { FindAllProductsUseCase } from "./FindAllProductsUseCase";

const product1 = new ProductStoreCatalogEntity({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
});

const product2 = new ProductStoreCatalogEntity({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Description 2',
  salesPrice: 200,
});

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
});

describe('Unit test find all products catalog store use case', () => {
  it('should find all products', async () => {
    const productRepository = MockRepository();
    const findAllProducts = new FindAllProductsUseCase(productRepository);

    const output = await findAllProducts.execute({});

    expect(productRepository.findAll).toBeCalledTimes(1);
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].description).toBe(product1.description);
    expect(output.products[0].salesPrice).toBe(product1.salesPrice);
    expect(output.products[1].id).toBe(product2.id.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].description).toBe(product2.description);
    expect(output.products[1].salesPrice).toBe(product2.salesPrice);
  });
});
