import { Sequelize, DataType } from "sequelize-typescript"
import type { MigrationFn } from "umzug"

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("categories_expense", {
    id: {
      type: DataType.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataType.BIGINT,
      allowNull: false,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  })
}

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("categories_expense")
}
