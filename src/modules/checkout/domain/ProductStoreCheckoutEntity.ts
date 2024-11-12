import { AggregateRootInterface, BaseEntity, Id } from "../../@shared";

type Input = {
  id?: Id;
  orderId: Id;
  name: string;
  description: string;
  salesPrice: number;
};

export class ProductStoreCheckoutEntity extends BaseEntity implements AggregateRootInterface {
  private _name: string;
  private _description: string;
  private _salesPrice: number;
  private _orderId: Id;

  constructor({ id, orderId, name, description, salesPrice }: Input) {
    super(id);
    this._orderId = orderId;
    this._name = name;
    this._description = description;
    this._salesPrice = salesPrice;
  }

  get orderId(): Id {
    return this._orderId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get salesPrice(): number {
    return this._salesPrice;
  }
}
