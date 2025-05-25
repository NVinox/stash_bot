import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { REPORT_COMMAND_TEXT } from "../constants/commands.constants"
import { ReportKeyboard } from "../buttons/keyboards/report.keyboard"
import { ErrorHelper } from "../helpers/errors.helper"

export class ReportCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(REPORT_COMMAND_TEXT, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      return await ctx.reply("Report command", new ReportKeyboard().get())
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
