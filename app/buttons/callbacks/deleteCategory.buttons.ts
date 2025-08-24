import { Markup } from "telegraf"
import { Markup as Markups } from "telegraf/typings/markup"
import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
} from "telegraf/typings/core/types/typegram"

import { StringHelper } from "../../helpers/string.helper"

import { IModelWithPaginate } from "../../interfaces/pagination.interface"

import { PaginationButtons } from "./pagination.buttons"

import { CategoryExpense } from "../../database/models/categoryExpense.model"
import { CategoryIncome } from "../../database/models/categoryIncome.model"

import {
  END_PREFIX,
  NEXT_PREFIX,
  PREV_PREFIX,
  START_PREFIX,
} from "../../constants/callback.constants"

export class DeleteCategoryButton {
  static getButtons(
    categories:
      | IModelWithPaginate<CategoryExpense[]>
      | IModelWithPaginate<CategoryIncome[]>,
    messageId: string,
    total: number,
    offset: number = 0
  ): Markups<InlineKeyboardMarkup> {
    const callbacks: InlineKeyboardButton.CallbackButton[][] = []
    const paginateButtons = new PaginationButtons(
      StringHelper.generateCallbackData(START_PREFIX, messageId),
      StringHelper.generateCallbackData(PREV_PREFIX, messageId),
      StringHelper.generateCallbackData(NEXT_PREFIX, messageId),
      StringHelper.generateCallbackData(END_PREFIX, messageId)
    ).getButtons(offset, total)

    categories.rows.forEach(({ title }) => {
      callbacks.push([Markup.button.callback(title, "sfs")])
    })

    callbacks.push(paginateButtons)

    return Markup.inlineKeyboard(callbacks)
  }
}
