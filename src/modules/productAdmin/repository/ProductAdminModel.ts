import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: 'product-admin-model',
  tableName: 'products',
  timestamps: false,
})
export class ProductAdminModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ field: 'sales_price', allowNull: true })
  declare salesPrice: number;

  @Column({ field: 'purchase_price', allowNull: false })
  declare purchasePrice: number;

  @Column({ allowNull: false })
  declare stock: number;

  @Column({ field: 'created_at', allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', allowNull: false })
  declare updatedAt: Date;
}
