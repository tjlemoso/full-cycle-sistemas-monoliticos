import { UseCaseInterface } from "../../../@shared";
import { ClientAdminGatewayInterface } from "../../gateway";
import { InputFindClientDto, OutputFindClientDto } from "./FindClientDto";

export class FindClientUseCase implements UseCaseInterface {
  private _clientRepository: ClientAdminGatewayInterface;

  constructor(clientRepository: ClientAdminGatewayInterface) {
    this._clientRepository = clientRepository;
  }

  async execute(input: InputFindClientDto): Promise<OutputFindClientDto> {
    const product = await this._clientRepository.find(input.id);

    return {
      id: product.id.id,
      name: product.name,
      email: product.email,
      document: product.document,
      street: product.address.street,
      number: product.address.number,
      complement: product.address.complement,
      city: product.address.city,
      state: product.address.state,
      zipCode: product.address.zipCode,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
