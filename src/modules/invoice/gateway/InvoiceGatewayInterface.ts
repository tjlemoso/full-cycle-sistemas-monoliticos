import { InvoiceEntity } from "../domain";

export interface InvoiceGatewayInterface {
  find(id: string): Promise<InvoiceEntity>;
  create(invoice: InvoiceEntity): Promise<void>;
}
