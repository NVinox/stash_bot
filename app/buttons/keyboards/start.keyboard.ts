import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"

import { IKeyboard } from "./keyboard.interface"

import { MAKE_EXPENSE, MAKE_INCOME } from "../../constants/keyboards.constants"

export class StartKeyboard implements IKeyboard {
  get(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard([MAKE_EXPENSE, MAKE_INCOME])
      .resize(true)
      .oneTime(true)
  }
}
