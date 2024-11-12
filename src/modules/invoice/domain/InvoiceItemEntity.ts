import { AggregateRootInterface, BaseEntity, Id } from "../../@shared";

type input = {
  id?: Id;
  name: string;
  price: number;
};

export class InvoiceItemEntity extends BaseEntity implements AggregateRootInterface {
  private _name: string;
  private _price: number;

  constructor({ id, name, price }: input) {
    super(id);
    this._name = name;
    this._price = price;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
