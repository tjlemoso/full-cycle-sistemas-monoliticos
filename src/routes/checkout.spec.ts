import express, { Express } from 'express';
import { checkoutRouter } from './checkout';
import { Sequelize } from 'sequelize-typescript';
import { Umzug } from 'umzug';
import { ClientAdminModel, InvoiceItemModel, InvoiceModel, ProductAdminModel, ProductStoreCatalogModel } from '../modules';
import { ClientModel } from '../modules/checkout/repository/ClientModel';
import { OrderModel } from '../modules/checkout/repository/OrderModel';
import { ProductModel } from '../modules/checkout/repository/ProductModel';
import { TransactionModel } from '../modules/payment';
import { migrator } from '../test-migrations/config-migrations/migrator';
import request from 'supertest';
import { clientRouter } from './clients';
import { productRouter } from './product';

describe('Integration test checkout api', () => {
  const app: Express = express();
  app.use(express.json());
  app.use('/client', clientRouter);
  app.use('/product', productRouter);
  app.use('/checkout', checkoutRouter);

  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: true,
    });
    sequelize.addModels([
      ClientModel,
      OrderModel,
      ProductModel,
      ProductAdminModel,
      ProductStoreCatalogModel,
      TransactionModel,
      ClientAdminModel,
      InvoiceModel,
      InvoiceItemModel,
    ]);
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
  it('should create a Checkout', async () => {
    const client = await request(app).post('/client').send({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@test.com',
      document: '123456789',
      street: 'Street',
      number: '123',
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: '12345678',
    });
    console.log('client', client.body);

    const product = await request(app).post('/product').send({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    });
    console.log('product', product.body);

    const output = await request(app).post('/checkout').send({
      id: '1',
      clientId: client.body.id,
      products: [{ productId: product.body.id }],
    });
    console.log('OUTPUT', output.body);

    // expect(output.status).toEqual(200);
  });
});
