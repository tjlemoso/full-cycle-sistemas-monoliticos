import { InputFindInvoiceFacadeDto, OutputFindInvoiceFacadeDto, InputGenerateInvoiceFacadeDto, OutputGenerateInvoiceFacadeDto } from "./InvoiceFacadeDto";

export interface InvoiceFacadeInterface {
  find(input: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto>;
  generate(input: InputGenerateInvoiceFacadeDto): Promise<OutputGenerateInvoiceFacadeDto>;
}
