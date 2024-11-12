import { Id } from "../../@shared";
import { ProductAdminEntity } from "../domain";
import { ProductAdminGatewayInterface } from "../gateway";
import { ProductAdminModel } from "./ProductAdminModel";

export class ProductAdminRepository implements ProductAdminGatewayInterface {
  async add(product: ProductAdminEntity): Promise<void> {
    await ProductAdminModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      salesPrice: product.salesPrice,
      stock: product.stock,
      createdAt: product.createdAt ?? new Date(),
      updatedAt: product.updatedAt ?? new Date(),
    });
  }
  async find(id: string): Promise<ProductAdminEntity> {
    const product = await ProductAdminModel.findOne({ where: { id } });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new ProductAdminEntity({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
    });
  }
}
