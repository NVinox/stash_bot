import { CategoryIncome } from "../database/models/categoryIncome.model"
import { CategoryExpense } from "../database/models/categoryExpense.model"
import { User } from "../database/models/user.model"
import { ICreateCategory } from "../interfaces/category.interface"
import { CATEGORY_TYPE_EXPENSES } from "../constants/keyboards.constants"
import {
  CATEGORY_EXPENSES_TEXT,
  CATEGORY_INCOME_TEXT,
} from "../constants/messages.constants"

export class CategoryService {
  static async createCategory(category: ICreateCategory): Promise<void> {
    const { type, title, userId } = category

    if (type === CATEGORY_TYPE_EXPENSES) {
      await CategoryExpense.create({ title, userId })
    } else {
      await CategoryIncome.create({ title, userId })
    }
  }

  static async getUserCategories(userId: number): Promise<string> {
    const user = await User.findByPk(userId, {
      include: [CategoryIncome, CategoryExpense],
    })

    if (user) {
      let message = ""
      const categoriesIncome = user.categoriesIncome
        .reduce<string[]>((acc, category) => {
          acc.push(category.title)
          return acc
        }, [])
        .join(", ")
      const categoriesExpense = user.categoriesExpense
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

    return ""
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
