import { CATEGORIES_START_MESSAGE } from "../../constants/scenes.constants"
import {
  USER_CATEGORIES_EXPENSES,
  USER_CATEGORIES_INCOME,
} from "../../mock/categories.mock"

interface ICategoriesMessages {
  getIntroductionHTML(): string
}

export class CategoriesMessage implements ICategoriesMessages {
  getIntroductionHTML() {
    const first = "Список ваших категорий.\n\nДоходы:"
    const incomeList = USER_CATEGORIES_INCOME.reduce<string>(
      (income, category) => {
        income += `- ${category.name}\n`
        return income
      },
      ""
    )
    const expensesList = USER_CATEGORIES_EXPENSES.reduce<string>(
      (expenses, category) => {
        expenses += `- ${category.name}\n`
        return expenses
      },
      ""
    )
    const expenses = "Расходы"

    return `${first}\n${incomeList}\n${expenses}\n${expensesList}`
  }
}
