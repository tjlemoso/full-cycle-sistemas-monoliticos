import { UseCaseInterface } from "../../../@shared";
import { TransactionEntity } from "../../domain";
import { ProcessPaymentGatewayInterface } from "../../gateway";
import { InputProcessPaymentUseCaseDto, OutputProcessPaymentUseCaseDto } from "./ProcessPaymentUseCaseDto";

export class ProcessPaymentUseCase implements UseCaseInterface {
  private _transactionRepository: ProcessPaymentGatewayInterface;

  constructor(transactionRepository: ProcessPaymentGatewayInterface) {
    this._transactionRepository = transactionRepository;
  }

  async execute(input: InputProcessPaymentUseCaseDto): Promise<OutputProcessPaymentUseCaseDto> {
    const transaction = new TransactionEntity({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.process();
    const processPayment = await this._transactionRepository.save(transaction);

    return {
      transactionId: processPayment.id.id,
      orderId: processPayment.orderId,
      amount: processPayment.amount,
      status: processPayment.status,
      createdAt: processPayment.createdAt,
      updatedAt: processPayment.updatedAt,
    };
  }
}
