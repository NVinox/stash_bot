import { Markup, Scenes } from "telegraf"
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
  CHANGE_CATEGORY_DELETE,
  DELETE_CATEGORY_SCENE_ID,
  EXPENSES_CATEGORY_LIST,
  INCOME_CATEGORY_LIST,
  NOT_EXIST_CATEGORY,
} from "../constants/scenes.constants"
import {
  CANCEL_TEXT,
  CATEGORY_TYPE_INCOME,
} from "../constants/keyboards.constants"

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

      await ctx.replyWithHTML(CHANGE_CATEGORY_DELETE, Markup.removeKeyboard())

      if (messageText === CATEGORY_TYPE_INCOME) {
        const categoriesInlineMarkup =
          await CategoryService.getUserIncomeCategoriesInline(
            new UserHelper(ctx).getId()
          )

        await ctx.replyWithHTML(INCOME_CATEGORY_LIST, categoriesInlineMarkup)
      } else {
        const categoriesInlineMarkup =
          await CategoryService.getUserExpenseCategoriesInline(
            new UserHelper(ctx).getId()
          )

        await ctx.replyWithHTML(EXPENSES_CATEGORY_LIST, categoriesInlineMarkup)
      }

      return await ctx.scene.leave()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }
}
