import { PaymentFacade, PaymentFacadeInterface } from "../facade";
import { TransactionRepository } from "../repository";
import { ProcessPaymentUseCase } from "../useCase";

export class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const paymentRepository = new TransactionRepository();
    const paymentUseCase = new ProcessPaymentUseCase(paymentRepository);
    const paymentFacade = new PaymentFacade({ processUseCase: paymentUseCase });

    return paymentFacade;
  }
}
