import express, { Express } from 'express';
import { productRouter } from './product';
import { Sequelize } from 'sequelize-typescript';
import { Umzug } from 'umzug';
import { ProductAdminModel } from '../modules/productAdmin/repository';
import request from 'supertest';
import { migrator } from '../test-migrations/config-migrations/migrator';
import { Address, Id, InvoiceEntity, InvoiceItemEntity, InvoiceItemModel, InvoiceModel, InvoiceRepository, ProductStoreCatalogModel } from '../modules';


describe("Integration test invoice api", () => {
  const app: Express = express();
  app.use(express.json());
  app.use('/invoice', productRouter);

  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
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
  it.skip("should do the invoice", async () => {
    const address = new Address({
      street: "Main Street",
      number: "123",
      complement: "Next to the bank",
      city: "New York",
      state: "New York",
      zipCode: "122343404",
    });

    const product1 = new InvoiceItemEntity({
      id: new Id("1"),
      name: "Product 1",
      price: 100,
    });

    const product2 = new InvoiceItemEntity({
      id: new Id("2"),
      name: "Product 2",
      price: 200,
    });

    const invoice = new InvoiceEntity({
      id: new Id("123"),
      name: "Invoice 1",
      document: "Document 1",
      items: [product1, product2],
      address: address,
    });

    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.create(invoice);
    const response = await request(app).get(`/invoice/${123}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Invoice 1");
  });
});