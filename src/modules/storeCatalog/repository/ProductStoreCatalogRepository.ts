import { Id } from "../../@shared";
import { ProductStoreCatalogEntity } from "../domain";
import { ProductStoreCatalogGateway } from "../gateway";
import { ProductStoreCatalogModel } from "./ProductStoreCatalogModel";

export class ProductStoreCatalogRepository implements ProductStoreCatalogGateway {
  async findAll(): Promise<ProductStoreCatalogEntity[]> {
    const products = await ProductStoreCatalogModel.findAll();

    return products.map((product) =>
      new ProductStoreCatalogEntity({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
        createdAt: product.createdAt ?? new Date(),
        updatedAt: product.updatedAt ?? new Date(),
      })
    );
  }
  async find(id: string): Promise<ProductStoreCatalogEntity> {
    const product = await ProductStoreCatalogModel.findOne({ where: { id } });

    return new ProductStoreCatalogEntity({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
