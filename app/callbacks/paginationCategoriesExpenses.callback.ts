import { Markup, Telegraf } from "telegraf"

import { APaginationCallback } from "../abstract/paginationCallback.abstract"

import { ErrorHelper } from "../helpers/errors.helper"
import { StringHelper } from "../helpers/string.helper"
import { PaginatiorHelper } from "../helpers/paginator.helper"

import { CategoryService } from "../services/category.service"

import { IBotContext } from "../context/context.interface"

import { PaginationButtons } from "../buttons/callbacks/pagination.buttons"
import { CategoriesList } from "../buttons/callbacks/categoriesList.buttons"

import { DeleteExpensesCategoryCallback } from "./deleteExpensesCategory.callback"

import {
  END_PREFIX,
  NEXT_PREFIX,
  PREV_PREFIX,
  START_PREFIX,
  DELETE_CATEGORY_EXPENSES_PREFIX,
} from "../constants/callback.constants"

export class PaginationCategoriesExpensesCallback extends APaginationCallback {
  constructor(
    public bot: Telegraf<IBotContext>,
    public paginator: PaginatiorHelper,
    public readonly messageId: string,
    public readonly userId: number
  ) {
    super(bot)
  }

  init(): void {
    this.start()
    this.prev()
    this.next()
    this.end()
  }

  protected start(): void {
    this.bot.action(
      StringHelper.generateCallbackData(START_PREFIX, this.messageId),
      this.startAction.bind(this)
    )
  }

  protected prev(): void {
    this.bot.action(
      StringHelper.generateCallbackData(PREV_PREFIX, this.messageId),
      this.prevAction.bind(this)
    )
  }

  protected next(): void {
    this.bot.action(
      StringHelper.generateCallbackData(NEXT_PREFIX, this.messageId),
      this.nextAction.bind(this)
    )
  }

  protected end(): void {
    this.bot.action(
      StringHelper.generateCallbackData(END_PREFIX, this.messageId),
      this.endAction.bind(this)
    )
  }

  private async startAction(ctx: IBotContext) {
    try {
      this.paginator.offsetReset()
      const categories = await CategoryService.getExpenseCategories(
        this.userId,
        this.paginator.offset
      )
      const paginationCallbacks = new PaginationButtons(
        StringHelper.generateCallbackData(START_PREFIX, this.messageId),
        StringHelper.generateCallbackData(PREV_PREFIX, this.messageId),
        StringHelper.generateCallbackData(NEXT_PREFIX, this.messageId),
        StringHelper.generateCallbackData(END_PREFIX, this.messageId)
      ).getButtons(this.paginator.offset, categories.count)
      const categoryCallbacks = CategoriesList.getList(
        categories.rows,
        DELETE_CATEGORY_EXPENSES_PREFIX
      )

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

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          ...Markup.inlineKeyboard(categoryCallbacks).reply_markup
            .inline_keyboard,
          ...Markup.inlineKeyboard(paginationCallbacks).reply_markup
            .inline_keyboard,
        ],
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async prevAction(ctx: IBotContext) {
    try {
      this.paginator.offsetDecrement()
      const categories = await CategoryService.getExpenseCategories(
        this.userId,
        this.paginator.offset
      )
      const paginationCallbacks = new PaginationButtons(
        StringHelper.generateCallbackData(START_PREFIX, this.messageId),
        StringHelper.generateCallbackData(PREV_PREFIX, this.messageId),
        StringHelper.generateCallbackData(NEXT_PREFIX, this.messageId),
        StringHelper.generateCallbackData(END_PREFIX, this.messageId)
      ).getButtons(this.paginator.offset, categories.count)
      const categoryCallbacks = CategoriesList.getList(
        categories.rows,
        DELETE_CATEGORY_EXPENSES_PREFIX
      )

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

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          ...Markup.inlineKeyboard(categoryCallbacks).reply_markup
            .inline_keyboard,
          ...Markup.inlineKeyboard(paginationCallbacks).reply_markup
            .inline_keyboard,
        ],
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async nextAction(ctx: IBotContext) {
    try {
      this.paginator.offsetIncrement()
      const categories = await CategoryService.getExpenseCategories(
        this.userId,
        this.paginator.offset
      )
      const paginationCallbacks = new PaginationButtons(
        StringHelper.generateCallbackData(START_PREFIX, this.messageId),
        StringHelper.generateCallbackData(PREV_PREFIX, this.messageId),
        StringHelper.generateCallbackData(NEXT_PREFIX, this.messageId),
        StringHelper.generateCallbackData(END_PREFIX, this.messageId)
      ).getButtons(this.paginator.offset, categories.count)
      const categoryCallbacks = CategoriesList.getList(
        categories.rows,
        DELETE_CATEGORY_EXPENSES_PREFIX
      )

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

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          ...Markup.inlineKeyboard(categoryCallbacks).reply_markup
            .inline_keyboard,
          ...Markup.inlineKeyboard(paginationCallbacks).reply_markup
            .inline_keyboard,
        ],
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async endAction(ctx: IBotContext) {
    try {
      this.paginator.offsetEnd()
      const categories = await CategoryService.getExpenseCategories(
        this.userId,
        this.paginator.offset
      )
      const paginationCallbacks = new PaginationButtons(
        StringHelper.generateCallbackData(START_PREFIX, this.messageId),
        StringHelper.generateCallbackData(PREV_PREFIX, this.messageId),
        StringHelper.generateCallbackData(NEXT_PREFIX, this.messageId),
        StringHelper.generateCallbackData(END_PREFIX, this.messageId)
      ).getButtons(this.paginator.offset, categories.count)
      const categoryCallbacks = CategoriesList.getList(
        categories.rows,
        DELETE_CATEGORY_EXPENSES_PREFIX
      )

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

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          ...Markup.inlineKeyboard(categoryCallbacks).reply_markup
            .inline_keyboard,
          ...Markup.inlineKeyboard(paginationCallbacks).reply_markup
            .inline_keyboard,
        ],
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
