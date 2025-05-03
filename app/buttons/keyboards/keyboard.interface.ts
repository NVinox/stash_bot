import { Markup } from "telegraf"

import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"

export interface IKeyboard {
  get(): Markup.Markup<ReplyKeyboardMarkup>
}
