import { Address, Id } from "../../../@shared";
import { ClientAdminEntity } from "../../domain";
import { FindClientUseCase } from "./FindClientUseCase";

const client = new ClientAdminEntity({
  id: new Id('1'),
  name: 'John Doe',
  email: 'johndo@test.com',
  document: '123456789',
  address: new Address({
    street: 'Street',
    number: '123',
    complement: 'Complement',
    city: 'City',
    state: 'State',
    zipCode: '12345678',
  }),
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client)),
});

describe('Unit test find client use case', () => {
  it('should find a client', async () => {
    const clientRepository = MockRepository();
    const findClientUseCase = new FindClientUseCase(clientRepository);

    const input = { id: '1' };

    const output = await findClientUseCase.execute(input);

    expect(clientRepository.find).toBeCalledTimes(1);
    expect(output.id).toBe(client.id.id);
    expect(output.name).toBe(client.name);
    expect(output.email).toBe(client.email);
    expect(output.document).toBe(client.document);
    expect(output.street).toBe(client.address.street);
    expect(output.number).toBe(client.address.number);
    expect(output.complement).toBe(client.address.complement);
    expect(output.city).toBe(client.address.city);
    expect(output.state).toBe(client.address.state);
    expect(output.zipCode).toBe(client.address.zipCode);
  });
});
