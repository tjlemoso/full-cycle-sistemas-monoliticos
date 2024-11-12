import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./TransactionModel";
import { Id } from "../../@shared";
import { TransactionEntity } from "../domain";
import { TransactionRepository } from "./TransactionRepository";

const input = {
  id: new Id('123'),
  orderId: '1',
  amount: 100,
};

describe('Integration test Process payment repository', () => {
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

  it('should save a transaction', async () => {
    const transaction = new TransactionEntity(input);
    transaction.approve();
    const transactionRepository = new TransactionRepository();
    const output = await transactionRepository.save(transaction);

    expect(input.id.id).toEqual(output.id.id);
    expect(input.orderId).toEqual(output.orderId);
    expect(input.amount).toEqual(output.amount);
    expect('approved').toEqual(output.status);
  });
});
