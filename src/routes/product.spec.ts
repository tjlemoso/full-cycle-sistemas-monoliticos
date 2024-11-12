import express, { Express } from 'express';
import { productRouter } from './product';
import { Sequelize } from 'sequelize-typescript';
import { Umzug } from 'umzug';
import { ProductAdminModel } from '../modules/productAdmin/repository';
import request from 'supertest';
import { migrator } from '../test-migrations/config-migrations/migrator';
import { ProductStoreCatalogModel } from '../modules';

describe('Integration test product api', () => {
  const app: Express = express();
  app.use(express.json());
  app.use('/product', productRouter);

  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductAdminModel, ProductStoreCatalogModel]);
    migration = migrator(sequelize);
    await migration.up();
  });
  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });
  it('should create a product admin', async () => {
    const output = await request(app).post('/product').send({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    });
    expect(output.status).toEqual(200);
    expect(output.body.id).toEqual('1');
    expect(output.body.name).toEqual('Product 1');
    expect(output.body.description).toEqual('Description 1');
  });
});
