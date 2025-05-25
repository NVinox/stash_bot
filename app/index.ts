import { Scenes, session, Telegraf } from "telegraf"

import { IBotContext } from "./context/context.interface"
import { IConfigService } from "./config/config.interface"

import { ConfigService } from "./config/config.service"

import { Command } from "./commands/command.class"
import { StartCommand } from "./commands/start.command"
import { HelpCommand } from "./commands/help.command"
import { ReportCommand } from "./commands/report.command"
import { CategoriesCommand } from "./commands/categories.command"
import { OperationCommand } from "./commands/operation.command"

import { CommandsButtons } from "./buttons/commands/commands.buttons"
import { CotegoriesScene } from "./scenes/categories.scene"

class Bot {
  private stage: Scenes.Stage<IBotContext, Scenes.SceneSessionData>
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
    this.stage = new Scenes.Stage<IBotContext>([
      new CotegoriesScene().getScene(),
    ])
    
    this.bot.use(session())
    this.bot.use(this.stage.middleware())
    this.bot.launch()
  }

  init() {
    this.setCommands()
  }

  private setCommands() {
    this.bot.telegram.setMyCommands(new CommandsButtons().get())

    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new ReportCommand(this.bot),
      new CategoriesCommand(this.bot),
      new OperationCommand(this.bot),
    ]

    for (const command of this.commands) {
      command.handle()
    }
  }
}

const bot = new Bot(new ConfigService())
bot.init()
