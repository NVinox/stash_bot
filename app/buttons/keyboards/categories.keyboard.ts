import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"

import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_TYPE_INCOME,
  CATEGORY_TYPE_EXPENSES,
} from "../../constants/keyboards.constants"

export class CategoiriesKeyboard {
  get(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard([[EDIT_CATEGORY, DELETE_CATEGORY], [ADD_CATEGORY]])
      .resize(true)
      .oneTime(true)
  }

  static getType(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard([[CATEGORY_TYPE_EXPENSES, CATEGORY_TYPE_INCOME]])
      .resize(true)
      .oneTime(true)
  }
}
