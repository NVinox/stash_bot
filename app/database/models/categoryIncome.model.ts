import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  AllowNull,
  ForeignKey,
  Model,
  Validate,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript"

import { User } from "./user.model"
import { Income } from "./income.model"

import { ICategoryModel } from "../../interfaces/category.interface"

@Table({
  tableName: "categories_income",
  modelName: "CategoryIncome",
  timestamps: true,
})
export class CategoryIncome extends Model<ICategoryModel> {
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

  @HasMany(() => Income)
  declare income: Income[]
}
