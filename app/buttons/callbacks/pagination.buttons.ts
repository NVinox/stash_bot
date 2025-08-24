import { Markup } from "telegraf"
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram"

import {
  PAGINATE_END_ICON,
  PAGINATE_NEXT_ICON,
  PAGINATE_PREV_ICON,
  PAGINATE_START_ICON,
} from "../../constants/emoji.constants"
import { LIMIT } from "../../constants/callback.constants"

export class PaginationButtons {
  constructor(
    private readonly startData: string,
    private readonly prevData: string,
    private readonly nextData: string,
    private readonly endData: string
  ) {}

  getButtons(
    offset: number,
    total: number
  ): InlineKeyboardButton.CallbackButton[] {
    const paginationCallbacks: InlineKeyboardButton.CallbackButton[] = []

    if (total <= LIMIT) {
      return paginationCallbacks
    }

    if (!offset && offset <= total) {
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_NEXT_ICON, this.nextData)
      )
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_END_ICON, this.endData)
      )
    }

    if (offset && offset < total) {
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_START_ICON, this.startData)
      )
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_PREV_ICON, this.prevData)
      )

      if (total - offset > LIMIT) {
        paginationCallbacks.push(
          Markup.button.callback(PAGINATE_NEXT_ICON, this.nextData)
        )
        paginationCallbacks.push(
          Markup.button.callback(PAGINATE_END_ICON, this.endData)
        )
      }
    }

    if (offset && offset >= total) {
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_START_ICON, this.startData)
      )
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_PREV_ICON, this.prevData)
      )
    }

    return paginationCallbacks
  }
}
