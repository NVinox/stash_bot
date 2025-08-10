import { Sequelize } from "sequelize-typescript"
import { ConfigService } from "../config/config.service"
import { ErrorHelper } from "../helpers/errors.helper"

import { User } from "./models/user.model"
import { Income } from "./models/income.model"
import { Expense } from "./models/expense.model"
import { CategoryIncome } from "./models/categoryIncome.model"
import { CategoryExpense } from "./models/categoryExpense.model"

export class DatabaseConnection {
  constructor(private readonly configService: ConfigService) {}

  async connect() {
    try {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: "localhost",
        database: this.configService.get("MYSQL_DATABASE"),
        password: this.configService.get("MYSQL_PASSWORD"),
        username: this.configService.get("MYSQL_USER"),
      })

      await sequelize.authenticate()
      sequelize.addModels([
        User,
        CategoryIncome,
        CategoryExpense,
        Income,
        Expense,
      ])
    } catch (error: unknown) {
      new ErrorHelper().connectionDataBaseError(error)
    }
  }
}
