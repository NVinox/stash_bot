import { Telegraf } from "telegraf"

import { Command } from "./command.class"

import { IBotContext } from "../context/context.interface"

import { INFO_COMMAND_TEXT } from "../constants/commands.constants"

export class InfoCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(INFO_COMMAND_TEXT, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    return await ctx.reply("Info command")
  }
}
