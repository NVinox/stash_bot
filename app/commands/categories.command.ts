import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { ErrorHelper } from "../helpers/errors.helper"
import { CategoriesMessage } from "../messages/commands/categories.message"
import { CATEGORIES_COMMAND_TEXT } from "../constants/commands.constants"
import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"

export class CategoriesCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(CATEGORIES_COMMAND_TEXT, this.sendCategories)
  }

  private async sendCategories(ctx: IBotContext) {
    try {
      return await ctx.reply(new CategoriesMessage().getIntroductionHTML(), {
        ...new CategoiriesKeyboard().get(),
        parse_mode: "HTML",
      })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
