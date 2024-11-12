import { Address, Id } from "../../@shared";
import { ClientAdminEntity } from "../domain";
import { ClientAdminGatewayInterface } from "../gateway";
import { ClientAdminModel } from "./ClientAdminModel";

export class ClientAdminRepository implements ClientAdminGatewayInterface {
  async add(client: ClientAdminEntity): Promise<void> {
    await ClientAdminModel.create({
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
    });
  }

  async find(id: string): Promise<ClientAdminEntity> {
    const client = await ClientAdminModel.findOne({ where: { id } });
    if (!client) {
      throw new Error('Client not found');
    }

    return new ClientAdminEntity({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address({
        street: client.street,
        number: client.number,
        complement: client.complement,
        city: client.city,
        state: client.state,
        zipCode: client.zipCode,
      }),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
