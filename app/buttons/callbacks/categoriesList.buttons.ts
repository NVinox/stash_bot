import { Markup } from "telegraf"
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram"
import { CategoryExpense } from "../../database/models/categoryExpense.model"
import { CategoryIncome } from "../../database/models/categoryIncome.model"
import { StringHelper } from "../../helpers/string.helper"

export class CategoriesList {
  static getList(
    categories: CategoryIncome[] | CategoryExpense[],
    prefix: string
  ): InlineKeyboardButton.CallbackButton[][] {
    const categoryCallbacks: InlineKeyboardButton.CallbackButton[][] = []

    categories.forEach(({ id, title }) => {
      categoryCallbacks.push([
        Markup.button.callback(
          title,
          StringHelper.generateCallbackData(prefix, id.toString())
        ),
      ])
    })

    return categoryCallbacks
  }
}
