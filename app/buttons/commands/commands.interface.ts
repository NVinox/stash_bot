import { BotCommand } from "telegraf/typings/core/types/typegram"

export interface ICommands {
  get(): readonly BotCommand[]
}
