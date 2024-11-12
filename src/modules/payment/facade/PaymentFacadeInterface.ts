import { InputProcessPaymentFacadeDto, OutputProcessPaymentFacadeDto } from "./PaymentFacadeDto";

export interface PaymentFacadeInterface {
  process(input: InputProcessPaymentFacadeDto): Promise<OutputProcessPaymentFacadeDto>;
}
