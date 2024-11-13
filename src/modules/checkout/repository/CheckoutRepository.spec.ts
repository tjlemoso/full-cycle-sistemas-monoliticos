import { Sequelize } from 'sequelize-typescript';
import { ClientCheckoutEntity, OrderCheckout, ProductStoreCheckoutEntity } from '../domain';
import { Address, Id } from '../../@shared';
import { OrderModel } from './OrderModel';
import { ClientModel } from './ClientModel';
import { ProductModel } from './ProductModel';
import { CheckoutRepository } from './CheckoutRepository';

const product1 = new ProductStoreCheckoutEntity({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description',
  salesPrice: 200,
  orderId: new Id('2')
});

const product2 = new ProductStoreCheckoutEntity({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Description',
  salesPrice: 150,
  orderId: new Id('2')
});

const address = new Address({
  street: 'Street',
  number: '123',
  complement: 'Complement',
  city: 'City',
  state: 'State',
  zipCode: '00000-000'
});

const client = new ClientCheckoutEntity({
  id: new Id('1'),
  name: 'Client',
  email: 'test@test.com',
  document: '000.000.000-00',
  address: address.fullAddress
});

const order = new OrderCheckout({
  id: new Id('1'),
  client,
  products: [product1, product2],
  status: 'pending'
});

describe('Checkout Repository unit test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([OrderModel, ClientModel, ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should be able to place an order', async () => {
    const checkoutRepository = new CheckoutRepository();

    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: client.address,
    });

    await checkoutRepository.addOrder(order);

    const output = await OrderModel.findOne({
      where: { id: order.id.id },
      include: ['items']
    });

    expect(output.toJSON()).toStrictEqual({
      id: order.id.id,
      clientId: client.id.id,
      items: [
        {
          id: product1.id.id,
          orderId: order.id.id,
          name: product1.name,
          description: product1.description,
          salesPrice: product1.salesPrice
        },
        {
          id: product2.id.id,
          orderId: order.id.id,
          name: product2.name,
          description: product2.description,
          salesPrice: product2.salesPrice
        }
      ],
      status: order.status
    });
  });

  it('Should be able to find a invoice', async () => {
    const checkoutRepository = new CheckoutRepository();

    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: client.address,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await OrderModel.create(
      {
        id: order.id.id,
        clientId: order.client.id.id,
        items: order.products.map(item => ({
          id: item.id.id,
          name: item.name,
          description: item.description,
          salesPrice: item.salesPrice
        })),
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      },
      {
        include: [
          {
            model: ProductModel
          },
          {
            model: ClientModel
          }
        ]
      }
    );

    const output = await checkoutRepository.findOrder(order.id.id);

    expect(output.id.id).toEqual(order.id.id);
    expect(output.client.id.id).toEqual(client.id.id);
    expect(output.client.name).toEqual(client.name);
    expect(output.client.email).toEqual(client.email);
    expect(output.client.document).toEqual(client.document);
    expect(output.client.address).toEqual(client.address);

    expect(output.products.length).toBe(2);

    expect(output.products[0].id.id).toEqual(product1.id.id);
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].description).toEqual(product1.description);
    expect(output.products[0].salesPrice).toEqual(product1.salesPrice);

    expect(output.products[1].id.id).toEqual(product2.id.id);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[1].description).toEqual(product1.description);
    expect(output.products[1].salesPrice).toEqual(product2.salesPrice);
  });
});
