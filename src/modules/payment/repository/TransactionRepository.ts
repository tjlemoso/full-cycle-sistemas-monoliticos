import { TransactionEntity } from "../domain";
import { ProcessPaymentGatewayInterface } from "../gateway";
import { TransactionModel } from "./TransactionModel";

export class TransactionRepository implements ProcessPaymentGatewayInterface {
  async save(input: TransactionEntity): Promise<TransactionEntity> {
    await TransactionModel.create({
      id: input.id.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return new TransactionEntity({
      id: input.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }
}
