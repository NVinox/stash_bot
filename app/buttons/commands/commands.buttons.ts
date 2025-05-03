import { BotCommand } from "telegraf/typings/core/types/typegram"

import { ICommands } from "./commands.interface"

import {
  INFO_COMMAND_TEXT,
  REPORT_COMMAND_TEXT,
  CATEGORIES_COMMAND_TEXT,
  INFO_COMMAND_DESCRIPTION,
  REPORT_COMMAND_DESCRIPTION,
  CATEGORIES_COMMAND_DESCRIPTION,
} from "../../constants/commands.constants"

export class CommandsButtons implements ICommands {
  get(): readonly BotCommand[] {
    return [
      { command: INFO_COMMAND_TEXT, description: INFO_COMMAND_DESCRIPTION },
      { command: REPORT_COMMAND_TEXT, description: REPORT_COMMAND_DESCRIPTION },
      {
        command: CATEGORIES_COMMAND_TEXT,
        description: CATEGORIES_COMMAND_DESCRIPTION,
      },
    ]
  }
}
