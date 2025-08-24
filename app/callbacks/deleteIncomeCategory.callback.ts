import { Markup, Telegraf } from "telegraf"

import { CategoryService } from "../services/category.service"

import { ErrorHelper } from "../helpers/errors.helper"

import { IBotContext } from "../context/context.interface"

import { CategoriesMessage } from "../messages/commands/categories.message"

import { CATEGORY_NOT_EXIST_DELETED } from "../constants/messages.constants"

export class DeleteIncomeCategoryCallback {
  constructor(
    private readonly bot: Telegraf<IBotContext>,
    private readonly prefixes: string[]
  ) {}

  deleteInit() {
    for (const prefix of this.prefixes) {
      this.bot.action(prefix, (ctx: IBotContext) => {
        this.delete(ctx, prefix)
      })
    }
  }

  private async delete(ctx: IBotContext, prefix: string) {
    try {
      const matchIds = prefix.match(/\d+/)

      if (matchIds?.length) {
        const id = parseInt(matchIds[0], 10)
        const category = await CategoryService.getIncomeCategory(id)

        if (category) {
          await CategoryService.deleteIncomeCategory(id)

          return await ctx.editMessageText(
            CategoriesMessage.getSuccessDeleteCategoryMessage(category.title),
            {
              reply_markup: {
                inline_keyboard: Markup.inlineKeyboard([]).reply_markup
                  .inline_keyboard,
              },
              parse_mode: "HTML",
            }
          )
        } else {
          return await ctx.editMessageText(
            CATEGORY_NOT_EXIST_DELETED,
            Markup.inlineKeyboard([])
          )
        }
      }
    } catch (error: unknown) {
      return new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
