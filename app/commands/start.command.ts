import { Telegraf } from "telegraf"

import { Command } from "./command.class"

import { IBotContext } from "../context/context.interface"

import { StartKeyboard } from "../buttons/keyboards/start.keyboard"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start(this.start)
  }

  private async start(ctx: IBotContext) {
    return await ctx.reply("Start command", new StartKeyboard().get())
  }
}
