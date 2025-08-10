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
import { CategoryIncome } from "./categoryIncome.model"

@Table({
  tableName: "income",
  modelName: "Income",
  timestamps: true,
})
export class Income extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number

  @ForeignKey(() => CategoryIncome)
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  declare categoryIncomeId: number

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

  @BelongsTo(() => CategoryIncome)
  declare categoryIncome?: CategoryIncome
}
