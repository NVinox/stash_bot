import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Unique,
  HasMany,
  Model,
} from "sequelize-typescript"

import { IUserModel } from "../../interfaces/user.interface"
import { CategoryIncome } from "./categoryIncome.model"
import { CategoryExpense } from "./categoryExpense.model"

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
export class User extends Model<IUserModel> {
  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare nickname: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date

  @HasMany(() => CategoryIncome)
  declare categoriesIncome?: CategoryIncome[]

  @HasMany(() => CategoryExpense)
  declare categoriesExpense?: CategoryExpense[]
}
