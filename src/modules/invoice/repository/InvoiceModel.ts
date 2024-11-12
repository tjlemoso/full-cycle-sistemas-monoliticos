import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceItemModel } from "./InvoiceItemModel";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare document: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: string;

  @Column({ allowNull: false })
  declare complement: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ field: 'zip_code', allowNull: false })
  declare zipCode: string;

  @HasMany(() => InvoiceItemModel)
  declare items: Awaited<InvoiceItemModel[]>;

  @Column({ allowNull: false })
  declare total: number;

  @Column({ field: 'created_at', allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', allowNull: false })
  declare updatedAt: Date;
}
