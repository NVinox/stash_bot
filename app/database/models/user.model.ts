import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
} from "sequelize-typescript"

import { IUserModel } from "../../interfaces/user.interface"

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
export class User extends Model<IUserModel> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
  })
  declare telegramId: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}
