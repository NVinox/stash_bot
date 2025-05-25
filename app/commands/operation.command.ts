import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { OperationKeyboard } from "../buttons/keyboards/operation.keyboard"
import { OPERATION_COMMAND_TEXT } from "../constants/commands.constants"
import { ErrorHelper } from "../helpers/errors.helper"

export class OperationCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(OPERATION_COMMAND_TEXT, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      return await ctx.reply("Operation command", new OperationKeyboard().get())
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendInternalError(ctx)
    }
  }
}
