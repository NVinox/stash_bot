import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"

import { IKeyboard } from "./keyboard.interface"

import {
  TEXT_FORMAT,
  DOCUMENT_FORMAT,
} from "../../constants/keyboards.constants"

export class ReportKeyboard implements IKeyboard {
  get(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard([[TEXT_FORMAT, DOCUMENT_FORMAT]])
      .resize(true)
      .oneTime(true)
  }
}
