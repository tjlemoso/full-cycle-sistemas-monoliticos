import { ClientAdminFacadeFactory } from "../../clientAdmin";
import { InvoiceFacadeFactory } from "../../invoice";
import { PaymentFacadeFactory } from "../../payment";
import { ProductAdminFacadeFactory } from "../../productAdmin/factory";
import { ProductStoreCatalogFacadeFactory } from "../../storeCatalog/factory";
import { CheckoutFacade } from "../facade";
import { CheckoutRepository } from "../repository/CheckoutRepository";
import { PlaceOrderUseCase } from "../useCase";

export class CheckoutFacadeFactory {
  static create() {
    const clientFacade = ClientAdminFacadeFactory.create();
    const productAdminFacade = ProductAdminFacadeFactory.create();
    const productStoreCatalogFacade = ProductStoreCatalogFacadeFactory.create();
    const orderRepository = new CheckoutRepository();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();

    const placeOrderUseCase = new PlaceOrderUseCase(
      clientFacade,
      productAdminFacade,
      productStoreCatalogFacade,
      orderRepository,
      invoiceFacade,
      paymentFacade,
    );

    return new CheckoutFacade({ placeOrderUseCase });
  }
}
