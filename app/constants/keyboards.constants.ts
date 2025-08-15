import {
  EMOJI_DOCUMENT,
  EMOJI_GRAPH_DOWN,
  EMOJI_GRAPH_UP,
  EMOJI_PEN,
  EMOJI_PLUS,
  EMOJI_STOP,
  EMOJI_TEXT,
} from "./emoji.constants"

export const MAKE_EXPENSE = `Внести расход ${EMOJI_GRAPH_UP}`
export const MAKE_INCOME = `Внести доход ${EMOJI_GRAPH_DOWN}`

export const TEXT_FORMAT = `Текстовый ${EMOJI_TEXT}`
export const DOCUMENT_FORMAT = `Документ ${EMOJI_DOCUMENT}`

export const EDIT_CATEGORY = `Редактировать ${EMOJI_PEN}`
export const DELETE_CATEGORY = `Удалить ${EMOJI_STOP}`
export const ADD_CATEGORY = `Добавить ${EMOJI_PLUS}`
export const CATEGORY_TYPE_EXPENSES = "Расходы"
export const CATEGORY_TYPE_INCOME = "Доходы"
