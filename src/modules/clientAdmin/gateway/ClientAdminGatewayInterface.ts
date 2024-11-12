import { ClientAdminEntity } from "../domain";

export interface ClientAdminGatewayInterface {
  add(client: ClientAdminEntity): Promise<void>;
  find(id: string): Promise<ClientAdminEntity>;
}
