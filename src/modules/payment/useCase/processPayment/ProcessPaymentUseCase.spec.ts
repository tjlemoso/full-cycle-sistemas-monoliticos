import { Id } from "../../../@shared";
import { ProcessPaymentUseCase } from "./ProcessPaymentUseCase";

const MockRepository = (input: Record<string, any>) => ({
  save: jest.fn().mockReturnValue(Promise.resolve(input)),
});

describe('Unit test Process payment use case', () => {
  it('should approve a transaction', async () => {
    const input = {
      id: new Id('123'),
      amount: 99,
      orderId: '123',
      status: 'approved',
    }

    const transactionRepository = MockRepository(input);
    const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);
    const inputTransaction = {
      orderId: '123',
      amount: 100,
    };

    const output = await processPaymentUseCase.execute(inputTransaction);

    expect(transactionRepository.save).toBeCalledTimes(1);
    expect(output.transactionId).toBe(input.id.id);
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe('approved');
  });

  it('should approve a transaction', async () => {
    const input = {
      id: new Id('123'),
      amount: 50,
      orderId: '123',
      status: 'declined',
    }

    const transactionRepository = MockRepository(input);
    const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);
    const inputTransaction = {
      orderId: '123',
      amount: 50,
    };

    const output = await processPaymentUseCase.execute(inputTransaction);

    expect(transactionRepository.save).toBeCalledTimes(1);
    expect(output.transactionId).toBe(input.id.id);
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe('declined');
  });
});
