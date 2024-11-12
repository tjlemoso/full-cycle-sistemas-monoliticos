import { UseCaseInterface } from "../../@shared";
import { InputProcessPaymentFacadeDto, OutputProcessPaymentFacadeDto } from "./PaymentFacadeDto";
import { PaymentFacadeInterface } from "./PaymentFacadeInterface";

interface UseCases {
  processUseCase: UseCaseInterface;
}

export class PaymentFacade implements PaymentFacadeInterface {
  private _processUseCase: UseCaseInterface;

  constructor({ processUseCase }: UseCases) {
    this._processUseCase = processUseCase;
  }

  process(input: InputProcessPaymentFacadeDto): Promise<OutputProcessPaymentFacadeDto> {
    const inputFacade = {
      orderId: input.orderId,
      amount: input.amount,
    };

    return this._processUseCase.execute(inputFacade);
  }
}
