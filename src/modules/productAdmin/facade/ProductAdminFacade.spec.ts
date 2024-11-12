import { Sequelize } from "sequelize-typescript";
import { ProductAdminModel } from "../repository";
import { ProductAdminFacadeFactory } from "../factory";

describe('Integration test product admin facade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductAdminModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productFacade = ProductAdminFacadeFactory.create();

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const productModel = await ProductAdminModel.findOne({ where: { id: input.id } });

    expect(input.id).toEqual(productModel.id);
    expect(input.name).toEqual(productModel.name);
    expect(input.description).toEqual(productModel.description);
    expect(input.purchasePrice).toEqual(productModel.purchasePrice);
    expect(input.stock).toEqual(productModel.stock);
  });

  it('should check product stock', async () => {
    const productFacade = ProductAdminFacadeFactory.create();

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const output = await productFacade.checkStock({ productId: input.id });

    expect(output.productId).toEqual(input.id);
    expect(output.stock).toEqual(input.stock);
  });
});
