import { session, Telegraf } from "telegraf"

import { IBotContext } from "./context/context.interface"
import { IConfigService } from "./config/config.interface"

import { ConfigService } from "./config/config.service"

import { Command } from "./commands/command.class"
import { StartCommand } from "./commands/start.command"
import { CommandsButtons } from "./buttons/commands/commands.buttons"

class Bot {
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
    this.bot.use(session())
    this.bot.telegram.setMyCommands(new CommandsButtons().get())
  }

  init() {
    this.commands = [new StartCommand(this.bot)]

    for (const command of this.commands) {
      command.handle()
    }

    this.bot.launch()
  }
}

const bot = new Bot(new ConfigService())
bot.init()
