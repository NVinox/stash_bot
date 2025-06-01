import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { CATEGORIES_COMMAND_TEXT } from "../constants/commands.constants"
import { ErrorHelper } from "../helpers/errors.helper"
import { CategoriesMessage } from "../messages/commands/categories.message"

export class CategoriesCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(CATEGORIES_COMMAND_TEXT, this.clickCommand)
  }

  private async clickCommand(ctx: IBotContext) {
    try {
      return await ctx.reply(new CategoriesMessage().getIntroductionHTML(), {
        parse_mode: "HTML",
      })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
