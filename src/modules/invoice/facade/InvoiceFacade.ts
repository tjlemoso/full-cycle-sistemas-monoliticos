import { UseCaseInterface } from "../../@shared";
import { InputFindInvoiceFacadeDto, OutputFindInvoiceFacadeDto, InputGenerateInvoiceFacadeDto, OutputGenerateInvoiceFacadeDto } from "./InvoiceFacadeDto";
import { InvoiceFacadeInterface } from "./InvoiceFacadeInterface";

interface UseCases {
  findUseCase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}

export class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _generateUseCase: UseCaseInterface;

  constructor({ findUseCase, generateUseCase }: UseCases) {
    this._findUseCase = findUseCase;
    this._generateUseCase = generateUseCase;
  }

  async find(input: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto> {
    const inputFacade = {
      id: input.id,
    };

    return await this._findUseCase.execute(inputFacade);
  }
  async generate(input: InputGenerateInvoiceFacadeDto): Promise<OutputGenerateInvoiceFacadeDto> {
    const inputFacade = {
      id: input.id,
      name: input.name,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      items: input.items,
    };

    return await this._generateUseCase.execute(inputFacade);
  }
}
