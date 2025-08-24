import { Telegraf } from "telegraf"

import { APaginationCallback } from "../abstract/paginationCallback.abstract"

import { ErrorHelper } from "../helpers/errors.helper"
import { PaginatiorHelper } from "../helpers/paginator.helper"

import { CategoryService } from "../services/category.service"

import { IBotContext } from "../context/context.interface"
import { StringHelper } from "../helpers/string.helper"
import {
  END_PREFIX,
  NEXT_PREFIX,
  PREV_PREFIX,
  START_PREFIX,
} from "../constants/callback.constants"
import { DeleteCategoryButton } from "../buttons/callbacks/deleteCategory.buttons"

export class CategoriesCallback extends APaginationCallback {
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
      const categories = await CategoryService.getIncomeCategories(
        this.userId,
        this.paginator.offset
      )
      const inlineButtons = DeleteCategoryButton.getButtons(
        categories,
        this.messageId,
        categories.count,
        this.paginator.offset
      )

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: inlineButtons.reply_markup.inline_keyboard,
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async prevAction(ctx: IBotContext) {
    try {
      this.paginator.offsetDecrement()
      const categories = await CategoryService.getIncomeCategories(
        this.userId,
        this.paginator.offset
      )
      const inlineButtons = DeleteCategoryButton.getButtons(
        categories,
        this.messageId,
        categories.count,
        this.paginator.offset
      )

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: inlineButtons.reply_markup.inline_keyboard,
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async nextAction(ctx: IBotContext) {
    try {
      this.paginator.offsetIncrement()
      const categories = await CategoryService.getIncomeCategories(
        this.userId,
        this.paginator.offset
      )
      const inlineButtons = DeleteCategoryButton.getButtons(
        categories,
        this.messageId,
        categories.count,
        this.paginator.offset
      )

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: inlineButtons.reply_markup.inline_keyboard,
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async endAction(ctx: IBotContext) {
    try {
      this.paginator.offsetEnd()
      const categories = await CategoryService.getIncomeCategories(
        this.userId,
        this.paginator.offset
      )
      const inlineButtons = DeleteCategoryButton.getButtons(
        categories,
        this.messageId,
        categories.count,
        this.paginator.offset
      )

      return await ctx.editMessageReplyMarkup({
        inline_keyboard: inlineButtons.reply_markup.inline_keyboard,
      })
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
