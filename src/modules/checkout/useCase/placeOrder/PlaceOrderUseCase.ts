import { Id, UseCaseInterface } from "../../../@shared";
import { ClientAdminFacadeInterface } from "../../../clientAdmin";
import { InvoiceFacadeInterface } from "../../../invoice/facade/InvoiceFacadeInterface";
import { PaymentFacadeInterface } from "../../../payment";
import { ProductAdminFacadeInterface } from "../../../productAdmin/facade/ProductAdminFacadeInterface";
import { ProductStoreCatalogFacadeInterface } from "../../../storeCatalog/facade/ProductStoreCatalogFacadeInterface";
import { ClientCheckoutEntity, OrderCheckout, ProductStoreCheckoutEntity } from "../../domain";
import { CheckoutGatewayInterface } from "../../gateway/CheckoutGatewayInterface";
import { InputPlaceOrderUseCaseDto, OutputPlaceOrderUseCaseDto } from "./PlaceOrderUseCaseDto";

export class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdminFacadeInterface;
  private _productFacade: ProductAdminFacadeInterface;
  private _catalogFacade: ProductStoreCatalogFacadeInterface;
  private _repository: CheckoutGatewayInterface;
  private _invoiceFacade: InvoiceFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;

  constructor(
    clientFacade: ClientAdminFacadeInterface,
    productFacade: ProductAdminFacadeInterface,
    catalogFacade: ProductStoreCatalogFacadeInterface,
    repository: CheckoutGatewayInterface,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface,
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
    this._repository = repository;
    this._invoiceFacade = invoiceFacade;
    this._paymentFacade = paymentFacade;
  }

  async execute(input: InputPlaceOrderUseCaseDto): Promise<OutputPlaceOrderUseCaseDto> {
    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error('Client not found');
    }
    await this.validateProducts(input);
    const products = await Promise.all(
      input.products.map((product) => this.getProduct(product.productId, input.id)),
    );
    const currentClient = new ClientCheckoutEntity({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: `${client.street}, ${client.number}, ${client.complement}, ${client.city}, ${client.state}, ${client.zipCode}`,
    });
    const order = new OrderCheckout({
      id: new Id(input.id),
      client: currentClient,
      products,
    });
    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total,
    });
    const invoice = payment.status === 'approved'
      ? await this._invoiceFacade.generate({
        name: client.name,
        document: client.document,
        street: client.street,
        number: client.number,
        complement: client.complement,
        city: client.city,
        state: client.state,
        zipCode: client.zipCode,
        items: order.products.map((product) => ({
          id: product.id.id,
          name: product.name,
          price: product.salesPrice,
        })),
      })
      : null;
    payment.status === 'approved' && order.approved();
    this._repository.addOrder(order);
    return {
      id: order.id.id,
      invoiceId: payment.status === 'approved' ? invoice.id : null,
      status: order.status,
      total: order.total,
      products: order.products.map((product) => ({ productId: product.id.id })),
    };
  }

  private async validateProducts(input: InputPlaceOrderUseCaseDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error('No products selected');
    }

    for(const product of input.products) {
      const productStock = await this._productFacade.checkStock({
        productId: product.productId,
      });
      if (productStock.stock <= 0) {
        throw new Error(`Product ${product.productId} is not available in stock`);
      }
    }
  }

  private async getProduct(productId: string, orderId: string): Promise<ProductStoreCheckoutEntity> {
    const product = await this._catalogFacade.find({ id: productId });
    if (!product) {
      throw new Error(`Product not found`);
    }
    const input = {
      id: new Id(product.id),
      orderId: new Id(orderId),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
    const productEntity = new ProductStoreCheckoutEntity(input);
    return productEntity;
  }
}
