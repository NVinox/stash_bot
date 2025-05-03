import { Telegraf } from "telegraf"

import { Command } from "./command.class"

import { IBotContext } from "../context/context.interface"

import { CATEGORIES_COMMAND_TEXT } from "../constants/commands.constants"

import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"

export class CategoriesCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(CATEGORIES_COMMAND_TEXT, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    return await ctx.reply(
      "Categories command",
      new CategoiriesKeyboard().get()
    )
  }
}
