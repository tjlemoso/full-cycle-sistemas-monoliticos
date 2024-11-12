import { UseCaseInterface } from "../../../@shared";
import { InvoiceEntity } from "../../domain";
import { InvoiceGatewayInterface } from "../../gateway";
import { InputFindInvoiceUseCaseDto, OutputFindInvoiceUseCaseDto } from "./FindInvoiceUseCaseDto";

export class FindInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGatewayInterface;

  constructor(invoiceRepository: InvoiceGatewayInterface) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: InputFindInvoiceUseCaseDto): Promise<OutputFindInvoiceUseCaseDto> {
    const invoice = await this._invoiceRepository.find(input.id);

    return OutputMapper.toOutput(invoice);
  }
}

class OutputMapper {
  static toOutput(invoiceItems: InvoiceEntity): OutputFindInvoiceUseCaseDto {
    return {
      id: invoiceItems.id.id,
      name: invoiceItems.name,
      document: invoiceItems.document,
      address: invoiceItems.address,
      items: invoiceItems.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoiceItems.total,
      createdAt: invoiceItems.createdAt,
      updatedAt: invoiceItems.updatedAt,
    };
  }
}
