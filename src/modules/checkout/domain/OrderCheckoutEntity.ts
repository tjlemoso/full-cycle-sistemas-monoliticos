import { BaseEntity, Id } from "../../@shared";
import { ClientCheckoutEntity } from "./ClientCheckoutEntity";
import { ProductStoreCheckoutEntity } from "./ProductStoreCheckoutEntity";

type Input = {
  id?: Id;
  client: ClientCheckoutEntity;
  products: ProductStoreCheckoutEntity[];
  status?: string;
};

export class OrderCheckout extends BaseEntity {
  private _client: ClientCheckoutEntity;
  private _products: ProductStoreCheckoutEntity[];
  private _status: string;

  constructor({ id, client, products, status }: Input) {
    super(id);
    this._client = client;
    this._products = products;
    this._status = status || "pending";
  }

  get client() {
    return this._client;
  }

  get products() {
    return this._products;
  }

  get status() {
    return this._status;
  }

  get total(): number {
    return this._products.reduce((acc, product) => {
      return acc + Number(product.salesPrice);
    }, 0);
  }

  approved(): void {
    this._status = "approved";
  }
}
