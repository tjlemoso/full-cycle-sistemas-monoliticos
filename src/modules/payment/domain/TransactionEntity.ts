import { AggregateRootInterface, BaseEntity, Id } from "../../@shared";

type input = {
  // id?: TransactionId;
  id?: Id;
  amount: number;
  orderId: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Object Value specific to this domain
// export class TransactionId extends Id {
//   constructor(id: string) {
//     super(id);
//   }
// }

export class TransactionEntity extends BaseEntity implements AggregateRootInterface {
  private _amount: number;
  private _orderId: string;
  private _status: string;

  constructor({ id, amount, orderId, status, createdAt, updatedAt }: input) {
    super(id, createdAt, updatedAt);
    this._amount = amount;
    this._orderId = orderId;
    this._status = status || 'pending';
  }

  validate(): void {
    if (this._amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
  }

  approve(): void {
    this._status = 'approved';
  }

  decline(): void {
    this._status = 'declined';
  }

  process(): void {
    if (this._amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }

  get amount(): number {
    return this._amount;
  }

  get orderId(): string {
    return this._orderId;
  }

  get status(): string {
    return this._status;
  }
}
