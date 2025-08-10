import {
  DataType,
  Model,
  Table,
  Column,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  Validate,
  BelongsTo,
} from "sequelize-typescript"
import { CategoryExpense } from "./categoryExpense.model"

@Table({
  tableName: "expenses",
  modelName: "Expense",
  timestamps: true,
})
export class Expense extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number

  @ForeignKey(() => CategoryExpense)
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  declare categoryExpenseId: number

  @AllowNull(false)
  @Validate({ isFloat: true })
  @Column({
    type: DataType.FLOAT,
  })
  declare amount: number

  @AllowNull(true)
  @Validate({ len: [1, 100] })
  @Column({
    type: DataType.STRING,
  })
  declare comment: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date

  @BelongsTo(() => CategoryExpense)
  declare categoryExpense?: CategoryExpense
}
