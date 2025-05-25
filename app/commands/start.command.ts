import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { StartKeyboard } from "../buttons/keyboards/start.keyboard"
import { StartMessage } from "../messages/commands/start.message"
import { ErrorHelper } from "../helpers/errors.helper"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start(this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    const userName = ctx.message?.from.first_name

    try {
      return await ctx.reply(new StartMessage().getHTML(userName), {
        ...new StartKeyboard().get(),
        parse_mode: "HTML",
      })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
