import { InputPlaceOrderCheckoutFacadeDto, OutputPlaceOrderCheckoutFacadeDto } from "./CheckoutFacadeDto";

export interface CheckoutFacadeInterface {
  placeOrder(
    input: InputPlaceOrderCheckoutFacadeDto
  ): Promise<OutputPlaceOrderCheckoutFacadeDto>
}
