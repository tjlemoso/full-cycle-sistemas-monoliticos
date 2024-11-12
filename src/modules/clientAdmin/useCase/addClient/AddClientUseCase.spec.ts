import { AddClientUseCase } from "./AddClientUseCase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe('Unit test add client use case', () => {
  it('should add a client', async () => {
    const clientRepository = MockRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);

    const input = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      document: '123456789',
      street: 'Street',
      number: '123',
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: '12345678',
    }

    const output = await addClientUseCase.execute(input);

    expect(clientRepository.add).toBeCalledTimes(1);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);
  });
});
