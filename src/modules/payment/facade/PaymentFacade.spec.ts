import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository";
import { PaymentFacadeFactory } from "../factory";

describe('Integration test Process payment facade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should process payment', async () => {
    const paymentFacade = PaymentFacadeFactory.create();

    const input = {
      orderId: '1',
      amount: 100,
    };

    const output = await paymentFacade.process(input);

    expect(output.transactionId).toBeTruthy();
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe('approved');
  });
});
