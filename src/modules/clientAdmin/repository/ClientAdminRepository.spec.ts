import { Sequelize } from "sequelize-typescript";
import { ClientAdminModel } from "./ClientAdminModel";
import { ClientAdminRepository } from "./ClientAdminRepository";
import { ClientAdminEntity } from "../domain";
import { Address, Id } from "../../@shared";

const client = {
  id: new Id('1'),
  name: 'John Doe',
  email: 'johndoe@test.com',
  document: '123456789',
  address: new Address({
    street: 'Street',
    number: '123',
    complement: 'Complement',
    city: 'City',
    state: 'State',
    zipCode: '12345678',
  }),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Integration test client admin repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientAdminModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a client', async () => {
    const clientEntity = new ClientAdminEntity(client);

    const clientRepository = new ClientAdminRepository();
    await clientRepository.add(clientEntity);
    const output = await clientRepository.find(client.id.id);

    expect(output.id.id).toBe(client.id.id);
    expect(output.name).toBe(client.name);
    expect(output.email).toBe(client.email);
    expect(output.document).toBe(client.document);
    expect(output.address.street).toBe(client.address.street);
    expect(output.address.number).toBe(client.address.number);
    expect(output.address.complement).toBe(client.address.complement);
    expect(output.address.city).toBe(client.address.city);
    expect(output.address.state).toBe(client.address.state);
    expect(output.address.zipCode).toBe(client.address.zipCode);
    expect(output.createdAt).toStrictEqual(client.createdAt);
    expect(output.updatedAt).toStrictEqual(client.updatedAt);
  });

  it('should create a client', async () => {
    const client = new ClientAdminEntity({
      id: new Id('1'),
      name: 'John Doe',
      email: 'johndoe@test.com',
      document: '123456789',
      address: new Address({
        street: 'Street',
        number: '123',
        complement: 'Complement',
        city: 'City',
        state: 'State',
        zipCode: '12345678',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientAdminRepository();
    await clientRepository.add(client);

    const clientDb = await ClientAdminModel.findOne({ where: { id: client.id.id } });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.document).toBe(client.document);
    expect(clientDb.street).toBe(client.address.street);
    expect(clientDb.number).toBe(client.address.number);
    expect(clientDb.complement).toBe(client.address.complement);
    expect(clientDb.city).toBe(client.address.city);
    expect(clientDb.state).toBe(client.address.state);
    expect(clientDb.zipCode).toBe(client.address.zipCode);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  });
});
