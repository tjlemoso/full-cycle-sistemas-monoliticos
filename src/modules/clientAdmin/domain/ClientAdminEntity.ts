import { Address, AggregateRootInterface, BaseEntity, Id } from "../../@shared";

type Input = {
  id?: Id;
  name: string;
  email: string;
  document: string;
  address: Address;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ClientAdminEntity extends BaseEntity implements AggregateRootInterface {
  private _name: string;
  private _email: string;
  private _document: string;
  private _address: Address;

  constructor({ id, name, email, document, address, createdAt, updatedAt }: Input) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._email = email;
    this._document = document;
    this._address = address;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }
}
