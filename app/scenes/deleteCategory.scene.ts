import { Markup, Scenes } from "telegraf"
import { Markup as Markups } from "telegraf/typings/markup"
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram"
import { WizardScene } from "telegraf/typings/scenes"
import { AScene } from "../abstract/scene.abstract"
import { UserHelper } from "../helpers/user.helper"
import { ErrorHelper } from "../helpers/errors.helper"
import { ValidatorHelper } from "../helpers/validator.helper"
import { IBotContext } from "../context/context.interface"
import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"
import { CategoryService } from "../services/category.service"
import {
  CATEGORIES_START_MESSAGE,
  CATEGORY_DELETE_CANCEL_TEXT,
  DELETE_CATEGORY_SCENE_ID,
  EXPENSES_CATEGORY_LIST,
  GET_CATEGORIES_PROGRESS_TEXT,
  INCOME_CATEGORY_LIST,
  NOT_EXIST_CATEGORY,
} from "../constants/scenes.constants"
import {
  CANCEL_TEXT,
  CATEGORY_TYPE_INCOME,
} from "../constants/keyboards.constants"
import { AsyncMessage } from "../helpers/asyncMessage.helper"

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
        return await ctx.scene.reenter()
      }

      if (messageText === CATEGORY_TYPE_INCOME) {
        const categoriesInlineMarkup = await AsyncMessage.sendWithProgress<
          Markups<InlineKeyboardMarkup>
        >(
          async () => {
            return await CategoryService.getUserIncomeCategoriesInline(
              new UserHelper(ctx).getId()
            )
          },
          ctx,
          GET_CATEGORIES_PROGRESS_TEXT
        )

        await ctx.replyWithHTML(INCOME_CATEGORY_LIST, categoriesInlineMarkup)
      } else {
        const categoriesInlineMarkup = await AsyncMessage.sendWithProgress<
          Markups<InlineKeyboardMarkup>
        >(
          async () => {
            return await CategoryService.getUserExpenseCategoriesInline(
              new UserHelper(ctx).getId()
            )
          },
          ctx,
          GET_CATEGORIES_PROGRESS_TEXT
        )

        await ctx.replyWithHTML(EXPENSES_CATEGORY_LIST, categoriesInlineMarkup)
      }

      return await ctx.scene.leave()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }
}
