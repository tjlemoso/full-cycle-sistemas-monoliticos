import { ValueObjectInterface } from "./ValueObjectInterface";
import { v4 as uuidv4 } from 'uuid';

export class Id implements ValueObjectInterface {
  private _id: string;

  constructor(id?: string) {
    this._id = id || uuidv4();
  }

  get id(): string {
    return this._id;
  }
}
