import { Sequelize } from "sequelize-typescript";
import { ProductStoreCatalogModel } from "./ProductStoreCatalogModel";
import { ProductStoreCatalogRepository } from "./ProductStoreCatalogRepository";

const product1 = {
  id: '1',
  name: 'Product 1',
  description: 'Product 1 description',
  salesPrice: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const product2 = {
  id: '2',
  name: 'Product 2',
  description: 'Product 2 description',
  salesPrice: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Integration test product store catalog repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductStoreCatalogModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find all products', async () => {
    await ProductStoreCatalogModel.create(product1);
    await ProductStoreCatalogModel.create(product2);

    const productRepository = new ProductStoreCatalogRepository();
    const output = await productRepository.findAll();

    expect(output.length).toBe(2);
    expect(output[0].id.id).toBe(product1.id);
    expect(output[0].name).toBe(product1.name);
    expect(output[0].description).toBe(product1.description);
    expect(output[0].salesPrice).toBe(product1.salesPrice);
    expect(output[1].id.id).toBe(product2.id);
    expect(output[1].name).toBe(product2.name);
    expect(output[1].description).toBe(product2.description);
    expect(output[1].salesPrice).toBe(product2.salesPrice);
  });

  it('should find a product', async () => {
    await ProductStoreCatalogModel.create(product1);
    const productRepository = new ProductStoreCatalogRepository();
    const output = await productRepository.find(product1.id);

    expect(output.id.id).toBe(product1.id);
    expect(output.name).toBe(product1.name);
    expect(output.description).toBe(product1.description);
    expect(output.salesPrice).toBe(product1.salesPrice);
  });
});
