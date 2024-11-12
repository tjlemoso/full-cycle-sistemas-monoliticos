import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./InvoiceModel";

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ field: 'invoice_id', allowNull: false })
  declare invoiceId: string;

  @BelongsTo(() => InvoiceModel)
  declare invoice: Awaited<InvoiceModel>;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
