import { OrderCheckout } from "../domain";

export interface CheckoutGatewayInterface {
  addOrder(order: OrderCheckout): Promise<void>;
  findOrder(id: string): Promise<OrderCheckout | null>;
}
