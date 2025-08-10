import { Sequelize, DataType } from "sequelize-typescript"
import type { MigrationFn } from "umzug"

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  const transaction = await sequelize.transaction()

  try {
    await sequelize.getQueryInterface().createTable("income", {
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryIncomeId: {
        type: DataType.BIGINT,
        allowNull: false,
        references: {
          model: "categories_income",
          key: "id",
        },
      },
      amount: {
        type: DataType.FLOAT,
        allowNull: false,
      },
      comment: {
        type: DataType.STRING,
        allowNull: true,
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

    await transaction.commit()
  } catch (error: unknown) {
    console.log(error)
    await transaction.rollback()
  }
}

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("income")
}
