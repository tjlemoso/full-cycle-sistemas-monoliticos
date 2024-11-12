import { InvoiceFacade } from "../facade";
import { InvoiceRepository } from "../repository";
import { FindInvoiceUseCase, GenerateInvoiceUseCase } from "../useCase";

export class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);

    return new InvoiceFacade({
      findUseCase: findInvoiceUseCase,
      generateUseCase: generateInvoiceUseCase,
    });
  }
}
