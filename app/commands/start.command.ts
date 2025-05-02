import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start(async (ctx) => {
      return await ctx.reply("Init bot")
    })
  }
}
