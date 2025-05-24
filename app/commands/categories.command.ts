import { Telegraf } from "telegraf"

import { Command } from "./command.class"

import { IBotContext } from "../context/context.interface"

import { CATEGORIES_COMMAND_TEXT } from "../constants/commands.constants"

import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"

import { CategoriesMessage } from "../messages/commands/categories.message"

export class CategoriesCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(CATEGORIES_COMMAND_TEXT, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    return await ctx.reply(new CategoriesMessage().getIntroductionHTML(), {
      ...new CategoiriesKeyboard().get(),
      parse_mode: "HTML",
    })
  }
}
