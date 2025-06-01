import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { StartMessage } from "../messages/commands/start.message"
import { ErrorHelper } from "../helpers/errors.helper"
import { UserHelper } from "../helpers/user.helper"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start(this.clickCommand)
  }

  private async clickCommand(ctx: IBotContext) {
    const firstName = new UserHelper(ctx).getFirstName()

    try {
      return await ctx.reply(new StartMessage().getHTML(firstName), {
        parse_mode: "HTML",
      })
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
