import { ClientAdminFacade } from "../facade";
import { ClientAdminRepository } from "../repository";
import { AddClientUseCase, FindClientUseCase } from "../useCase";

export class ClientAdminFacadeFactory {
  static create() {
    const clientRepository = new ClientAdminRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUseCase(clientRepository);
    const clientFacade = new ClientAdminFacade({
      addUseCase: addClientUseCase,
      findUseCase: findClientUseCase,
    });

    return clientFacade;
  }
}
