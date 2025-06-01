import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { ErrorHelper } from "../helpers/errors.helper"
import { CategoriesMessage } from "../messages/commands/categories.message"
import {
  ADD_CATEGORIES_COMMAND_TEXT,
  CATEGORIES_COMMAND_TEXT,
  DELETE_CATEGORIES_COMMAND_TEXT,
  EDIT_CATEGORIES_COMMAND_TEXT,
} from "../constants/commands.constants"

export class CategoriesCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(CATEGORIES_COMMAND_TEXT, this.sendCategories)
    this.bot.command(ADD_CATEGORIES_COMMAND_TEXT, this.createCategory)
    this.bot.command(EDIT_CATEGORIES_COMMAND_TEXT, this.editCategory)
    this.bot.command(DELETE_CATEGORIES_COMMAND_TEXT, this.deleteCategory)
  }

  private async sendCategories(ctx: IBotContext) {
    try {
      return await ctx.reply(new CategoriesMessage().getIntroductionHTML(), {
        parse_mode: "HTML",
      })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }

  private async createCategory(ctx: IBotContext) {
    try {
      return await ctx.reply("Добавление категории", { parse_mode: "HTML" })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }

  private async editCategory(ctx: IBotContext) {
    try {
      return await ctx.reply("Редактирование категории", { parse_mode: "HTML" })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }

  private async deleteCategory(ctx: IBotContext) {
    try {
      return await ctx.reply("Удаление категории", { parse_mode: "HTML" })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
