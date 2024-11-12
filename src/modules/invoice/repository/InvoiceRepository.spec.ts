import { Sequelize } from "sequelize-typescript";
import { InvoiceRepository } from "./InvoiceRepository";
import { InvoiceEntity, InvoiceItemEntity } from "../domain";
import { Address, Id } from "../../@shared";
import { InvoiceModel } from "./InvoiceModel";
import { InvoiceItemModel } from "./InvoiceItemModel";

const input = new InvoiceEntity({
  id: new Id('123'),
  name: 'John Doe',
  document: '12345678900',
  address: new Address({
    street: 'Street',
    number: '123',
    complement: 'Complement',
    city: 'City',
    state: 'State',
    zipCode: '12345678',
  }),
  items: [
    new InvoiceItemEntity({
      id: new Id('123'),
      name: 'Item 1',
      price: 10,
    }),
    new InvoiceItemEntity({
      id: new Id('456'),
      name: 'Item 2',
      price: 20,
    }),
  ],
});

describe('Integration test Invoice repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find an invoice', async () => {
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.create(input);

    const output = await invoiceRepository.find(input.id.id);

    expect(output.id.id).toBe(input.id.id);
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.address.street).toBe(input.address.street);
    expect(output.address.number).toBe(input.address.number);
    expect(output.address.complement).toBe(input.address.complement);
    expect(output.address.city).toBe(input.address.city);
    expect(output.address.state).toBe(input.address.state);
    expect(output.address.zipCode).toBe(input.address.zipCode);
    expect(output.items.length).toBe(input.items.length);
    expect(output.items[0].id.id).toBe(input.items[0].id.id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id.id).toBe(input.items[1].id.id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
    expect(output.total).toBe(input.items[0].price + input.items[1].price);
  });

  it('should create an invoice', async () => {
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.create(input);

    const output = await InvoiceModel.findOne({
      where: { id: input.id.id },
      include: [InvoiceItemModel]
    });

    expect(output.id).toBe(input.id.id);
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.address.street);
    expect(output.number).toBe(input.address.number);
    expect(output.complement).toBe(input.address.complement);
    expect(output.city).toBe(input.address.city);
    expect(output.state).toBe(input.address.state);
    expect(output.zipCode).toBe(input.address.zipCode);
    expect(output.items.length).toBe(input.items.length);
    expect(output.items[0].id).toBe(input.items[0].id.id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBe(input.items[1].id.id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
    expect(output.total).toBe(30);
  });
});
