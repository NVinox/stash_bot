import { CategoryIncome } from "../database/models/categoryIncome.model"
import { CategoryExpense } from "../database/models/categoryExpense.model"
import { User } from "../database/models/user.model"
import { StringHelper } from "../helpers/string.helper"
import { ICreateCategory } from "../interfaces/category.interface"
import { CATEGORY_TYPE_EXPENSES } from "../constants/keyboards.constants"
import {
  CATEGORY_EXPENSES_TEXT,
  CATEGORY_INCOME_TEXT,
} from "../constants/messages.constants"

export class CategoryService {
  static async createCategory(
    category: ICreateCategory
  ): Promise<CategoryExpense | CategoryIncome> {
    const { type, userId } = category
    const title = StringHelper.capitalizeFirstLetter(category.title)

    if (type === CATEGORY_TYPE_EXPENSES) {
      return await CategoryExpense.create({ title, userId })
    } else {
      return await CategoryIncome.create({ title, userId })
    }
  }

  static async getUserCategories(userId: number): Promise<string> {
    let message = ""
    const categoriesIncome = (
      await CategoryIncome.findAll({ where: { userId } })
    )
      .reduce<string[]>((acc, category) => {
        acc.push(category.title)
        return acc
      }, [])
      .join(", ")
    const categoriesExpense = (
      await CategoryExpense.findAll({
        where: { userId },
      })
    )
      .reduce<string[]>((acc, category) => {
        acc.push(category.title)
        return acc
      }, [])
      .join(", ")

    if (categoriesIncome) {
      message += `${CATEGORY_INCOME_TEXT}:\n${categoriesIncome}\n\n`
    }

    if (categoriesExpense) {
      message += `${CATEGORY_EXPENSES_TEXT}:\n${categoriesExpense}`
    }

    return message
  }

  static async isHasUserCategories(userId: number): Promise<boolean> {
    const user = await User.findByPk(userId, {
      include: [CategoryIncome, CategoryExpense],
    })

    if (user) {
      return Boolean(
        user.categoriesExpense.length || user.categoriesIncome.length
      )
    }

    return false
  }
}
