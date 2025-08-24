import { Markup, Scenes, Telegraf } from "telegraf"
import { WizardScene } from "telegraf/typings/scenes"

import { AScene } from "../abstract/scene.abstract"

import { UserHelper } from "../helpers/user.helper"
import { ErrorHelper } from "../helpers/errors.helper"
import { ValidatorHelper } from "../helpers/validator.helper"
import { AsyncMessage } from "../helpers/asyncMessage.helper"
import { PaginatiorHelper } from "../helpers/paginator.helper"
import { StringHelper } from "../helpers/string.helper"

import { IBotContext } from "../context/context.interface"
import { IModelWithPaginate } from "../interfaces/pagination.interface"

import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"

import { CategoryService } from "../services/category.service"

import { CategoryIncome } from "../database/models/categoryIncome.model"
import { CategoryExpense } from "../database/models/categoryExpense.model"

import { PaginationCategoriesIncomeCallback } from "../callbacks/paginationCategoriesIncome.callback"
import { DeleteIncomeCategoryCallback } from "../callbacks/deleteIncomeCategory.callback"
import { PaginationCategoriesExpensesCallback } from "../callbacks/paginationCategoriesExpenses.callback"
import { DeleteExpensesCategoryCallback } from "../callbacks/deleteExpensesCategory.callback"

import { PaginationButtons } from "../buttons/callbacks/pagination.buttons"
import { CategoriesList } from "../buttons/callbacks/categoriesList.buttons"

import {
  NOT_EXIST_CATEGORY,
  DELETE_CATEGORY_SCENE_ID,
  CATEGORIES_START_MESSAGE,
  CATEGORY_DELETE_CANCEL_TEXT,
  GET_CATEGORIES_PROGRESS_TEXT,
} from "../constants/scenes.constants"
import {
  END_PREFIX,
  NEXT_PREFIX,
  PREV_PREFIX,
  START_PREFIX,
  DELETE_CATEGORY_INCOME_PREFIX,
  DELETE_CATEGORY_EXPENSES_PREFIX,
} from "../constants/callback.constants"
import {
  CANCEL_TEXT,
  CATEGORY_TYPE_INCOME,
} from "../constants/keyboards.constants"
import {
  DELETE_EXPENSES_CATEGORY,
  DELETE_INCOME_CATEGORY,
  EXPENSES_CATEGORIES_NOT_EXIST,
  INCOME_CATEGORIES_NOT_EXIST,
} from "../constants/messages.constants"

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
      const messageId = String(ctx.message?.message_id)

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

        if (!categories.count) {
          return await ctx.replyWithHTML(INCOME_CATEGORIES_NOT_EXIST)
        }

        const paginationCallbacks = new PaginationButtons(
          StringHelper.generateCallbackData(START_PREFIX, messageId),
          StringHelper.generateCallbackData(PREV_PREFIX, messageId),
          StringHelper.generateCallbackData(NEXT_PREFIX, messageId),
          StringHelper.generateCallbackData(END_PREFIX, messageId)
        ).getButtons(0, categories.count)
        const categoryCallbacks = CategoriesList.getList(
          categories.rows,
          DELETE_CATEGORY_INCOME_PREFIX
        )

        new PaginationCategoriesIncomeCallback(
          this.bot,
          new PaginatiorHelper(categories.count),
          messageId,
          new UserHelper(ctx).getId()
        ).init()

        new DeleteIncomeCategoryCallback(
          this.bot,
          categories.rows.reduce<string[]>((acc, { id }) => {
            acc.push(
              StringHelper.generateCallbackData(
                DELETE_CATEGORY_INCOME_PREFIX,
                id.toString()
              )
            )
            return acc
          }, [])
        ).deleteInit()

        await ctx.replyWithHTML(DELETE_INCOME_CATEGORY, {
          reply_markup: {
            inline_keyboard: [
              ...Markup.inlineKeyboard(categoryCallbacks).reply_markup
                .inline_keyboard,
              ...Markup.inlineKeyboard(paginationCallbacks).reply_markup
                .inline_keyboard,
            ],
          },
        })
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

        if (!categories.count) {
          return await ctx.replyWithHTML(EXPENSES_CATEGORIES_NOT_EXIST)
        }

        const paginationCallbacks = new PaginationButtons(
          StringHelper.generateCallbackData(START_PREFIX, messageId),
          StringHelper.generateCallbackData(PREV_PREFIX, messageId),
          StringHelper.generateCallbackData(NEXT_PREFIX, messageId),
          StringHelper.generateCallbackData(END_PREFIX, messageId)
        ).getButtons(0, categories.count)
        const categoryCallbacks = CategoriesList.getList(
          categories.rows,
          DELETE_CATEGORY_EXPENSES_PREFIX
        )

        new PaginationCategoriesExpensesCallback(
          this.bot,
          new PaginatiorHelper(categories.count),
          messageId,
          new UserHelper(ctx).getId()
        ).init()

        new DeleteExpensesCategoryCallback(
          this.bot,
          categories.rows.reduce<string[]>((acc, { id }) => {
            acc.push(
              StringHelper.generateCallbackData(
                DELETE_CATEGORY_EXPENSES_PREFIX,
                id.toString()
              )
            )
            return acc
          }, [])
        ).deleteInit()

        await ctx.replyWithHTML(DELETE_EXPENSES_CATEGORY, {
          reply_markup: {
            inline_keyboard: [
              ...Markup.inlineKeyboard(categoryCallbacks).reply_markup
                .inline_keyboard,
              ...Markup.inlineKeyboard(paginationCallbacks).reply_markup
                .inline_keyboard,
            ],
          },
        })
      }

      return await ctx.scene.leave()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }
}
