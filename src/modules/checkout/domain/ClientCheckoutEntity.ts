import { AggregateRootInterface, BaseEntity, Id } from "../../@shared"

type Input = {
  id?: Id;
  name: string;
  email: string;
  document: string;
  address: string;
}

export class ClientCheckoutEntity extends BaseEntity implements AggregateRootInterface {
  private _name: string;
  private _email: string;
  private _document: string;
  private _address: string;

  constructor({ id, name, email, document, address }: Input) {
    super(id);
    this._name = name;
    this._email = email;
    this._document = document;
    this._address = address;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }
}
