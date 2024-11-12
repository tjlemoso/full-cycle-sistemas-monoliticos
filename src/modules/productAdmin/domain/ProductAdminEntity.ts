import { AggregateRootInterface, BaseEntity, Id } from "../../@shared";

type Input = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductAdminEntity extends BaseEntity implements AggregateRootInterface {
  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _stock: number;

  constructor({ id, name, description, purchasePrice, stock, createdAt, updatedAt }: Input) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._description = description;
    this._purchasePrice = purchasePrice;
    this._stock = stock;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get purchasePrice(): number {
    return this._purchasePrice;
  }

  get salesPrice(): number {
    return this._purchasePrice * 1.5;
  }

  get stock(): number {
    return this._stock;
  }

  set name(name: string) {
    this._name = name;
  }

  set description(description: string) {
    this._description = description;
  }

  set purchasePrice(purchasePrice: number) {
    this._purchasePrice = purchasePrice;
  }

  set stock(stock: number) {
    this._stock = stock;
  }
}
