import { Id } from "../../../@shared";
import { ProductAdminEntity } from "../../domain";
import { CheckStockUseCase } from "./CheckStockUseCase";

const product = new ProductAdminEntity({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  purchasePrice: 10,
  stock: 10,
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe('Unit test check stock product admin', () => {
  it('should get stock of a product', async () => {
    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const input = {
      productId: '1',
    };

    const output = await checkStockUseCase.execute(input);

    expect(productRepository.find).toBeCalledTimes(1);
    expect(output.productId).toBe(input.productId);
    expect(output.stock).toBe(product.stock);
  });
});
