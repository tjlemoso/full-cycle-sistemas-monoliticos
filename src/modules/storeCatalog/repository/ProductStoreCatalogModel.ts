import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: 'product-store-catalog-model',
  tableName: 'products',
  timestamps: false,
})
export class ProductStoreCatalogModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ field: 'sales_price', allowNull: true })
  declare salesPrice: number;

  @Column({ field: 'purchase_price', allowNull: true })
  declare purchasePrice: number;

  @Column({ allowNull: true })
  declare stock: number;

  @Column({ field: 'created_at' ,allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', allowNull: false })
  declare updatedAt: Date;
}
