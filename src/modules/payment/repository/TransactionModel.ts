import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'transactions',
  timestamps: false,
})
export class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ field: 'order_id', allowNull: false })
  declare orderId: string;

  @Column({ allowNull: false })
  declare amount: number;

  @Column({ allowNull: false })
  declare status: string;

  @Column({ field: 'created_at', allowNull: false })
  declare  createdAt: Date;

  @Column({ field: 'updated_at', allowNull: false })
  declare updatedAt: Date;
}
