import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import { OrderModel } from './OrderModel'

@Table({
  tableName: 'order_products',
  timestamps: false
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @ForeignKey(() => OrderModel)
  @Column({ field: 'order_id', allowNull: true })
  declare orderId: string

  @BelongsTo(() => OrderModel)
  declare order: Awaited<OrderModel>

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare description: string

  @Column({ field: 'sales_price', allowNull: false })
  declare salesPrice: number
}
