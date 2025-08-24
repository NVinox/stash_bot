import { Markup, Scenes, Telegraf } from "telegraf"
import { WizardScene } from "telegraf/typings/scenes"

import { AScene } from "../abstract/scene.abstract"

import { UserHelper } from "../helpers/user.helper"
import { ErrorHelper } from "../helpers/errors.helper"
import { ValidatorHelper } from "../helpers/validator.helper"
import { AsyncMessage } from "../helpers/asyncMessage.helper"

import { IBotContext } from "../context/context.interface"
import { IModelWithPaginate } from "../interfaces/pagination.interface"

import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"
import { DeleteCategoryButton } from "../buttons/callbacks/deleteCategory.buttons"

import { CategoryService } from "../services/category.service"

import { CategoryIncome } from "../database/models/categoryIncome.model"
import { CategoryExpense } from "../database/models/categoryExpense.model"

import {
  NOT_EXIST_CATEGORY,
  INCOME_CATEGORY_LIST,
  EXPENSES_CATEGORY_LIST,
  DELETE_CATEGORY_SCENE_ID,
  CATEGORIES_START_MESSAGE,
  CATEGORY_DELETE_CANCEL_TEXT,
  GET_CATEGORIES_PROGRESS_TEXT,
} from "../constants/scenes.constants"
import {
  CANCEL_TEXT,
  CATEGORY_TYPE_INCOME,
} from "../constants/keyboards.constants"
import { PaginatiorHelper } from "../helpers/paginator.helper"
import { CategoriesCallback } from "../callbacks/categories.callback"

export class DeleteCategoryScene extends AScene {
  constructor(public bot: Telegraf<IBotContext>) {
    super()
  }

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
        const categories = await AsyncMessage.sendWithProgress<
          IModelWithPaginate<CategoryIncome[]>
        >(
          async () => {
            return await CategoryService.getIncomeCategories(
              new UserHelper(ctx).getId()
            )
          },
          ctx,
          GET_CATEGORIES_PROGRESS_TEXT
        )
        const inlineButtons = DeleteCategoryButton.getButtons(
          categories,
          String(ctx.message?.message_id),
          categories.count
        )

        new CategoriesCallback(
          this.bot,
          new PaginatiorHelper(categories.count),
          String(ctx.message?.message_id),
          new UserHelper(ctx).getId()
        ).init()

        await ctx.replyWithHTML(INCOME_CATEGORY_LIST, inlineButtons)
      } else {
        const categories = await AsyncMessage.sendWithProgress<
          IModelWithPaginate<CategoryExpense[]>
        >(
          async () => {
            return await CategoryService.getExpenseCategories(
              new UserHelper(ctx).getId()
            )
          },
          ctx,
          GET_CATEGORIES_PROGRESS_TEXT
        )
        const inlineButtons = DeleteCategoryButton.getButtons(
          categories,
          String(ctx.message?.message_id),
          categories.count
        )

        new CategoriesCallback(
          this.bot,
          new PaginatiorHelper(categories.count),
          String(ctx.message?.message_id),
          new UserHelper(ctx).getId()
        ).init()

        await ctx.replyWithHTML(EXPENSES_CATEGORY_LIST, inlineButtons)
      }

      return await ctx.scene.leave()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }
}
