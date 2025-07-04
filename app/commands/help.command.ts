import { Telegraf } from "telegraf"

import { Command } from "./command.class"

import { IBotContext } from "../context/context.interface"

import { HelpMessage } from "../messages/commands/help.message"

export class HelpCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.help(this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    return await ctx.reply(new HelpMessage().getHTML(), {
      parse_mode: "HTML",
    })
  }
}
