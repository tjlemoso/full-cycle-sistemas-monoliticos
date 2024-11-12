import { UseCaseInterface } from "../../@shared";
import { InputFindProductStoreCatalogFacadeDto, OutputFindProductStoreCatalogFacadeDto, OutputFindAllProductStoreCatalogFacadeDto } from "./ProductStoreCatalogFacadeDto";
import { ProductStoreCatalogFacadeInterface } from "./ProductStoreCatalogFacadeInterface";

interface UseCases {
  findUseCase: UseCaseInterface;
  findAllUseCase: UseCaseInterface;
};

export class ProductStoreCatalogFacade implements ProductStoreCatalogFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _findAllUseCase: UseCaseInterface;

  constructor({ findUseCase, findAllUseCase }: UseCases) {
    this._findUseCase = findUseCase;
    this._findAllUseCase = findAllUseCase;
  }

  async find(input: InputFindProductStoreCatalogFacadeDto): Promise<OutputFindProductStoreCatalogFacadeDto> {
    const inputFacade = {
      id: input.id,
    };

    return await this._findUseCase.execute(inputFacade);
  }
  async findAll(): Promise<OutputFindAllProductStoreCatalogFacadeDto> {
    return await this._findAllUseCase.execute({});
  }
}
