import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { CATEGORIES_COMMAND_TEXT } from "../constants/commands.constants"
import { ErrorHelper } from "../helpers/errors.helper"

export class CategoriesCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(CATEGORIES_COMMAND_TEXT, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      return await ctx.scene.enter("CATEGORIES_SCENE")
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
