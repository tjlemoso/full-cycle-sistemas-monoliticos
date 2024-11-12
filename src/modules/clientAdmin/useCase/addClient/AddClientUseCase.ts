import { Address, Id, UseCaseInterface } from "../../../@shared";
import { ClientAdminEntity } from "../../domain";
import { ClientAdminGatewayInterface } from "../../gateway";
import { InputAddClientUseDto, OutputAddClientUseDto } from "./AddClientDto";

export class AddClientUseCase implements UseCaseInterface {
  private _clientRepository: ClientAdminGatewayInterface;

  constructor(clientRepository: ClientAdminGatewayInterface) {
    this._clientRepository = clientRepository;
  }

  async execute(input: InputAddClientUseDto): Promise<OutputAddClientUseDto> {
    const inputClient = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
    };

    const client = new ClientAdminEntity(inputClient);
    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
