import { Address, Id, UseCaseInterface } from "../../../@shared";
import { InvoiceEntity, InvoiceItemEntity } from "../../domain";
import { InvoiceGatewayInterface } from "../../gateway";
import { InputGenerateInvoiceUseCaseDto, OutputGenerateInvoiceUseCaseDto } from "./GenerateInvoiceUseCaseDto";

export class GenerateInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGatewayInterface;

  constructor(invoiceRepository: InvoiceGatewayInterface) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: InputGenerateInvoiceUseCaseDto): Promise<OutputGenerateInvoiceUseCaseDto> {
    const invoice = new InvoiceEntity({
      ...(input.id && { id: new Id(input.id) }),
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map((item) => new InvoiceItemEntity({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
    });
    await this._invoiceRepository.create(invoice);
    return OutputMapper.toOutput(invoice);
  }
}

class OutputMapper {
  static toOutput(invoiceItems: InvoiceEntity): OutputGenerateInvoiceUseCaseDto {
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
