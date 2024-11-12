import { Id } from "../../../@shared";
import { ProductStoreCatalogEntity } from "../../domain";
import { FindProductUseCase } from "./FindProductUseCase";

const product = new ProductStoreCatalogEntity({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
});

const MockRepository = () => ({
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe('Unit test find product catalog store use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = { id: '1' };

    const output = await findProductUseCase.execute(input);

    expect(productRepository.find).toBeCalledTimes(1);
    expect(output.id).toBe(product.id.id);
    expect(output.name).toBe(product.name);
    expect(output.description).toBe(product.description);
    expect(output.salesPrice).toBe(product.salesPrice);
  });
});
