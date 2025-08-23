import { Markup, Scenes } from "telegraf"
import { WizardScene } from "telegraf/typings/scenes"
import { AScene } from "../abstract/scene.abstract"
import { ErrorHelper } from "../helpers/errors.helper"
import { ValidatorHelper } from "../helpers/validator.helper"
import { IBotContext } from "../context/context.interface"
import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"
import {
  CATEGORIES_START_MESSAGE,
  CATEGORY_DELETE_CANCEL_TEXT,
  DELETE_CATEGORY_SCENE_ID,
  NOT_EXIST_CATEGORY,
} from "../constants/scenes.constants"
import { CANCEL_TEXT } from "../constants/keyboards.constants"
import {
  PAGINATE_END_ICON,
  PAGINATE_NEXT_ICON,
  PAGINATE_PREV_ICON,
  PAGINATE_START_ICON,
} from "../constants/emoji.constants"

export class DeleteCategoryScene extends AScene {
  getScene(): WizardScene<IBotContext> {
    return new Scenes.WizardScene<IBotContext>(
      DELETE_CATEGORY_SCENE_ID,
      (ctx) => {
        this.start(ctx)
      },
      (ctx) => {
        this.setType(ctx)
      }
    )
  }

  private async start(ctx: IBotContext) {
    try {
      await ctx.replyWithHTML(
        CATEGORIES_START_MESSAGE,
        CategoiriesKeyboard.getType()
      )

      return await ctx.wizard.next()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }

  private async setType(ctx: IBotContext) {
    try {
      const messageText = ctx.text!

      if (messageText === CANCEL_TEXT) {
        await ctx.replyWithHTML(
          CATEGORY_DELETE_CANCEL_TEXT,
          Markup.removeKeyboard()
        )
        return await ctx.scene.leave()
      }

      if (!ValidatorHelper.isCorrectCategoryType(messageText)) {
        await ctx.replyWithHTML(
          NOT_EXIST_CATEGORY,
          CategoiriesKeyboard.getType()
        )
        return await ctx.wizard.selectStep(1)
      }

      await ctx.replyWithHTML(
        "Выберите категорию для удаления:",
        Markup.removeKeyboard()
      )
      await ctx.replyWithHTML("Список категорий:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Магазины", callback_data: "book" }],
            [{ text: "Автомобиль", callback_data: "auto" }],
            [{ text: "Шопинг", callback_data: "shop" }],
            [
              { text: PAGINATE_START_ICON, callback_data: "start" },
              { text: PAGINATE_PREV_ICON, callback_data: "prev" },
              { text: PAGINATE_NEXT_ICON, callback_data: "next" },
              { text: PAGINATE_END_ICON, callback_data: "end" },
            ],
          ],
        },
      })

      return await ctx.scene.leave()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }
}
