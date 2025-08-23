import { Markup, Scenes } from "telegraf"
import { WizardScene } from "telegraf/typings/scenes"
import { AScene } from "../abstract/scene.abstract"
import { IBotContext } from "../context/context.interface"
import { AsyncMessage } from "../helpers/asyncMessage.helper"
import { ValidatorHelper } from "../helpers/validator.helper"
import { ErrorHelper } from "../helpers/errors.helper"
import { UserHelper } from "../helpers/user.helper"
import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"
import { CategoryService } from "../services/category.service"
import { CategoriesMessage } from "../messages/commands/categories.message"
import { ValidatorMessage } from "../messages/validator.message"
import {
  ADD_CATEGORIES_PROGRESS_TEXT,
  ADD_CATEGORY_SCENE_ID,
  CATEGORIES_CANCEL_TEXT,
  CATEGORIES_INPUT_NAME,
  CATEGORIES_START_MESSAGE,
  NOT_EXIST_CATEGORY,
} from "../constants/scenes.constants"
import { CANCEL_TEXT } from "../constants/keyboards.constants"
import { IS_TEXT_NOT_NUMBER } from "../constants/validator.constants"
import { CategoryExpense } from "../database/models/categoryExpense.model"
import { CategoryIncome } from "../database/models/categoryIncome.model"

export class AddCategoryScene extends AScene {
  getScene(): WizardScene<IBotContext> {
    return new Scenes.WizardScene<IBotContext>(
      ADD_CATEGORY_SCENE_ID,
      (ctx) => {
        this.start(ctx)
      },
      (ctx) => {
        this.setType(ctx)
      },
      (ctx) => {
        this.setName(ctx)
      }
    )
  }

  private async start(ctx: IBotContext) {
    try {
      ctx.scene.session.state.createCategory = {
        type: "",
        title: "",
        userId: 0,
      }

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
        await ctx.replyWithHTML(CATEGORIES_CANCEL_TEXT, Markup.removeKeyboard())
        return await ctx.scene.leave()
      }

      if (!ValidatorHelper.isCorrectCategoryType(messageText)) {
        await ctx.replyWithHTML(
          NOT_EXIST_CATEGORY,
          CategoiriesKeyboard.getType()
        )
        return await ctx.wizard.selectStep(1)
      }

      ctx.scene.session.state.createCategory.userId = new UserHelper(
        ctx
      ).getId()
      ctx.scene.session.state.createCategory.type = messageText

      await ctx.replyWithHTML(
        CATEGORIES_INPUT_NAME,
        CategoiriesKeyboard.getCancel()
      )
      return await ctx.wizard.next()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }

  private async setName(ctx: IBotContext) {
    try {
      const messageText = ctx.text!

      if (messageText === CANCEL_TEXT) {
        await ctx.replyWithHTML(CATEGORIES_CANCEL_TEXT, Markup.removeKeyboard())
        return await ctx.scene.leave()
      }

      if (!ValidatorHelper.isCorrectStringLength(messageText)) {
        await ctx.replyWithHTML(
          ValidatorMessage.getNotCorrectStringLength(),
          CategoiriesKeyboard.getCancel()
        )
        return await ctx.wizard.selectStep(2)
      }

      if (ValidatorHelper.isStringNumber(messageText)) {
        await ctx.replyWithHTML(
          IS_TEXT_NOT_NUMBER,
          CategoiriesKeyboard.getCancel()
        )
        return await ctx.wizard.selectStep(2)
      }

      if (ValidatorHelper.isStringNumber(messageText)) {
        return await ctx.wizard.selectStep(2)
      }

      ctx.scene.session.state.createCategory.title = messageText

      const createdCategory = await AsyncMessage.sendWithProgress<
        CategoryExpense | CategoryIncome
      >(
        async () => {
          return await CategoryService.createCategory({
            userId: ctx.scene.session.state.createCategory.userId,
            type: ctx.scene.session.state.createCategory.type,
            title: ctx.scene.session.state.createCategory.title,
          })
        },
        ctx,
        ADD_CATEGORIES_PROGRESS_TEXT
      )

      await ctx.replyWithHTML(
        CategoriesMessage.getSuccessCreateCategoryMessage(
          createdCategory.title
        ),
        Markup.removeKeyboard()
      )

      return await ctx.scene.leave()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }
}
