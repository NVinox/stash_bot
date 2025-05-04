import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"

import { IKeyboard } from "./keyboard.interface"

import { BEGIN } from "../../constants/keyboards.constants"

export class StartKeyboard implements IKeyboard {
  get(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard([[BEGIN]])
      .resize(true)
      .oneTime(true)
  }
}
