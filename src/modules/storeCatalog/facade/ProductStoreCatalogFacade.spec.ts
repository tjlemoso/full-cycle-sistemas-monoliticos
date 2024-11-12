import { Sequelize } from "sequelize-typescript";
import { ProductStoreCatalogModel } from "../repository";
import { ProductStoreCatalogFacadeFactory } from "../factory";

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

describe('Integration test product catalog store facade', () => {
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

  it('should find a product', async () => {
    const productFacade = ProductStoreCatalogFacadeFactory.create();
    await ProductStoreCatalogModel.create(product1);

    const output = await productFacade.find({ id: product1.id });

    expect(output.id).toEqual(product1.id);
    expect(output.name).toEqual(product1.name);
    expect(output.description).toEqual(product1.description);
    expect(output.salesPrice).toEqual(product1.salesPrice);
  });

  it('should find all products', async () => {
    const productFacade = ProductStoreCatalogFacadeFactory.create();
    await ProductStoreCatalogModel.create(product1);
    await ProductStoreCatalogModel.create(product2);

    const output = await productFacade.findAll();

    expect(output.products.length).toEqual(2);
    expect(output.products[0].id).toEqual(product1.id);
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].description).toEqual(product1.description);
    expect(output.products[0].salesPrice).toEqual(product1.salesPrice);
    expect(output.products[1].id).toEqual(product2.id);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[1].description).toEqual(product2.description);
    expect(output.products[1].salesPrice).toEqual(product2.salesPrice);
  });
});
