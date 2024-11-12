import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/ClientModel";
import { OrderModel } from "../repository/OrderModel";
import { ProductModel } from "../repository/ProductModel";
import { ProductAdminModel } from "../../productAdmin/repository";
import { ProductStoreCatalogModel } from "../../storeCatalog";
import { TransactionModel } from "../../payment";
import { ClientAdminFacadeFactory, ClientAdminModel } from "../../clientAdmin";
import { InvoiceItemModel, InvoiceModel } from "../../invoice";
import { ProductAdminFacadeFactory } from "../../productAdmin/factory";
import { ProductStoreCatalogFacadeFactory } from "../../storeCatalog/factory";
import { CheckoutFacadeFactory } from "../factory";

describe('Integration test checkout facade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      ProductModel,
      ClientModel,
      ProductAdminModel,
      ProductStoreCatalogModel,
      TransactionModel,
      ClientAdminModel,
      InvoiceModel,
      InvoiceItemModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it.skip('Should add an order', async () => {
    const clientAdminFacade = ClientAdminFacadeFactory.create();
    const inputClientAdmin = {
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
    };
    await clientAdminFacade.add(inputClientAdmin);
    const clientAdmin = await clientAdminFacade.find({ id: inputClientAdmin.id });

    const productAdminFacade = ProductAdminFacadeFactory.create();
    const inputProductAdmin = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    };
    await productAdminFacade.addProduct(inputProductAdmin);

    const productStoreCatalogFacade = ProductStoreCatalogFacadeFactory.create();
    const productsStoreCatalog = await productStoreCatalogFacade.findAll();

    const checkoutFacade = CheckoutFacadeFactory.create();
    const products = productsStoreCatalog?.products?.map(product => ({
      productId: product.id,
    }));

    const output = await checkoutFacade.placeOrder({
      id: '1',
      clientId: clientAdmin?.id,
      products,
    });

    console.log(output);
  });
});
