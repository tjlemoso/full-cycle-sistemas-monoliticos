import { AddProductUseCase } from "./AddProductUseCase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn()
});

describe('Unit test add product admin use case', () => {
  it('should add a product', async () => {
    const productRepository = MockRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);

    const input = {
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10
    }

    const output = await addProductUseCase.execute(input);

    expect(productRepository.add).toBeCalledTimes(1);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.purchasePrice).toBe(input.purchasePrice);
    expect(output.stock).toBe(input.stock);
  });
});
