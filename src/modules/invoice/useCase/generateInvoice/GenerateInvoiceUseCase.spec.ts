import { GenerateInvoiceUseCase } from "./GenerateInvoiceUseCase";

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
});

describe('Unit test Generate invoice use case', () => {
  it('should Generate an invoice', async () => {
    const invoiceRepository = MockRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    const input = {
      id: '123',
      name: 'John Doe',
      document: '123456789',
      street: 'Rua 1',
      number: '123',
      complement: 'Casa',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345678',
      items: [
        {
          id: '123',
          name: 'Item 1',
          price: 10,
        },
        {
          id: '123',
          name: 'Item 2',
          price: 20,
        },
      ],
    };

    const output = await generateInvoiceUseCase.execute(input);

    expect(invoiceRepository.create).toBeCalledTimes(1);
    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.address.street).toBe(input.street);
    expect(output.address.number).toBe(input.number);
    expect(output.address.complement).toBe(input.complement);
    expect(output.address.city).toBe(input.city);
    expect(output.address.state).toBe(input.state);
    expect(output.address.zipCode).toBe(input.zipCode);
    expect(output.items.length).toBe(input.items.length);
    expect(output.items[0].id).toBe(input.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBe(input.items[1].id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
    expect(output.total).toBe(30);
  });
});
