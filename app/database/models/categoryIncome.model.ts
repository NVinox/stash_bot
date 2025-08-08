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
} from "sequelize-typescript"

import { User } from "./user.model"

import { ICategoryModel } from "../../interfaces/category.interface"
import { IUserModel } from "../../interfaces/user.interface"

@Table({
  tableName: "categories_income",
  modelName: "CategoryIncome",
  timestamps: true,
})
export class CategoryIncome extends Model<ICategoryModel> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
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
  declare user?: IUserModel

  toJSON() {
    return { ...this.get() }
  }
}
