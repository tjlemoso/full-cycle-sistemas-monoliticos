import { Sequelize } from "sequelize-typescript";
import { ProductAdminModel } from "./ProductAdminModel";
import { ProductAdminEntity } from "../domain";
import { Id } from "../../@shared";
import { ProductAdminRepository } from "./ProductAdminRepository";

const input = {
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  purchasePrice: 100,
  stock: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Integration test product admin repository', () => {
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
    const product = new ProductAdminEntity(input);
    const productRepository = new ProductAdminRepository();

    await productRepository.add(product);

    const productModel = await ProductAdminModel.findOne({ where: { id: input.id.id } });

    expect(input.id.id).toEqual(productModel.id);
    expect(input.name).toEqual(productModel.name);
    expect(input.description).toEqual(productModel.description);
    expect(input.purchasePrice).toEqual(productModel.purchasePrice);
    expect(input.stock).toEqual(productModel.stock);
  });

  it('should find a product', async () => {
    const productCreated = new ProductAdminEntity(input);
    const productRepository = new ProductAdminRepository();

    await productRepository.add(productCreated);

    const product = await productRepository.find(input.id.id);

    expect(input.id.id).toEqual(product.id.id);
    expect(input.name).toEqual(product.name);
    expect(input.description).toEqual(product.description);
    expect(input.purchasePrice).toEqual(product.purchasePrice);
    expect(input.stock).toEqual(product.stock);
  });
});
