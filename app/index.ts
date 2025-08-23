import { Scenes, session, Telegraf } from "telegraf"

import { IBotContext } from "./context/context.interface"
import { IConfigService } from "./config/config.interface"

import { ConfigService } from "./config/config.service"

import { Command } from "./abstract/command.abstract"
import { StartCommand } from "./commands/start.command"
import { HelpCommand } from "./commands/help.command"
import { ReportCommand } from "./commands/report.command"
import { CategoriesCommand } from "./commands/categories.command"
import { OperationCommand } from "./commands/operation.command"

import { AddCategoryScene } from "./scenes/addCategory.scene"
import { DeleteCategoryScene } from "./scenes/deleteCategory.scene"

import { CommandsButtons } from "./buttons/commands/commands.buttons"

import { DeleteCategoryAction } from "./actions/deleteCategory.action"
import { AddCategoryAction } from "./actions/addCategory.action"

import { DatabaseConnection } from "./database/connecttion.database"

class Bot {
  private stage: Scenes.Stage<IBotContext, Scenes.SceneSessionData>
  bot: Telegraf<IBotContext>
  commands: Command[] = []
  textActions: Command[] = []

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
    this.stage = new Scenes.Stage<IBotContext>([
      new AddCategoryScene().getScene(),
      new DeleteCategoryScene().getScene(),
    ])

    this.bot.use(session())
    this.bot.use(this.stage.middleware())
    this.bot.launch()
  }

  init() {
    this.setCommands()
    this.setTextActions()
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

  private setTextActions() {
    this.textActions = [
      new AddCategoryAction(this.bot),
      new DeleteCategoryAction(this.bot),
    ]

    for (const action of this.textActions) {
      action.handle()
    }
  }
}

const database = new DatabaseConnection(new ConfigService())
const bot = new Bot(new ConfigService())

database.connect()
bot.init()
