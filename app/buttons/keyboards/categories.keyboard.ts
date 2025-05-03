import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"

import { IKeyboard } from "./keyboard.interface"

import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../../constants/keyboards.constants"

export class CategoiriesKeyboard implements IKeyboard {
  get(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard([[EDIT_CATEGORY, DELETE_CATEGORY], [ADD_CATEGORY]])
      .resize(true)
      .oneTime(true)
  }
}
