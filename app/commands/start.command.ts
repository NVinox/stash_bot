import { Telegraf } from "telegraf"

import { Command } from "./command.class"

import { IBotContext } from "../context/context.interface"

import { StartKeyboard } from "../buttons/keyboards/start.keyboard"

import { StartMessage } from "../messages/commands/start.message"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start(this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    const userName = ctx.message?.from.first_name

    return await ctx.reply(new StartMessage().getHTML(userName), {
      ...new StartKeyboard().get(),
      parse_mode: "HTML",
    })
  }
}
