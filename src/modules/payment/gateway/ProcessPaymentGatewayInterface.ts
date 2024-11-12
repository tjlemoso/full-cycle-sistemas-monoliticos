import { TransactionEntity } from "../domain";

export interface ProcessPaymentGatewayInterface {
  save(input: TransactionEntity): Promise<TransactionEntity>;
}
