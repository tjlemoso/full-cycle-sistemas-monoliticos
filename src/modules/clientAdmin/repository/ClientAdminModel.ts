import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "clients",
  timestamps: false,
})
export class ClientAdminModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare email: string;

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

  @Column({ field: 'created_at', allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', allowNull: false })
  declare updatedAt: Date;
}
