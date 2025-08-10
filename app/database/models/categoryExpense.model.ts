import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  AllowNull,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  Model,
  Validate,
  HasMany,
} from "sequelize-typescript"

import { User } from "./user.model"

import { ICategoryModel } from "../../interfaces/category.interface"
import { Expense } from "./expense.model"

@Table({
  tableName: "categories_expense",
  modelName: "CategoryExpense",
  timestamps: true,
})
export class CategoryExpense extends Model<ICategoryModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  declare userId: number

  @AllowNull(false)
  @Validate({ len: [1, 20] })
  @Column({
    type: DataType.STRING,
  })
  declare title: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date

  @BelongsTo(() => User)
  declare user?: User

  @HasMany(() => Expense)
  declare expenses: Expense[]
}
