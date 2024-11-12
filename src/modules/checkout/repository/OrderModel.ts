import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import { ClientModel } from './ClientModel'
import { ProductModel } from './ProductModel'

@Table({
  tableName: 'orders',
  timestamps: false
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @ForeignKey(() => ClientModel)
  @Column({ field: 'client_id', allowNull: false })
  declare clientId: string

  @BelongsTo(() => ClientModel)
  declare client: Awaited<ClientModel>

  @HasMany(() => ProductModel)
  declare items: Awaited<ProductModel[]>

  @Column({ allowNull: false })
  declare status: string
}
