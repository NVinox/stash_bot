import { BotCommand } from "telegraf/typings/core/types/typegram"

import { ICommands } from "./commands.interface"

import {
  HELP_COMMAND_TEXT,
  REPORT_COMMAND_TEXT,
  OPERATION_COMMAND_TEXT,
  CATEGORIES_COMMAND_TEXT,
  HELP_COMMAND_DESCRIPTION,
  REPORT_COMMAND_DESCRIPTION,
  OPERATION_COMMAND_DESCRIPTION,
  CATEGORIES_COMMAND_DESCRIPTION,
  EDIT_CATEGORIES_COMMAND_DESCRIPTION,
  DELETE_CATEGORIES_COMMAND_TEXT,
  DELETE_CATEGORIES_COMMAND_DESCRIPTION,
  EDIT_CATEGORIES_COMMAND_TEXT,
  ADD_CATEGORIES_COMMAND_DESCRIPTION,
  ADD_CATEGORIES_COMMAND_TEXT,
} from "../../constants/commands.constants"

export class CommandsButtons implements ICommands {
  get(): readonly BotCommand[] {
    return [
      {
        command: OPERATION_COMMAND_TEXT,
        description: OPERATION_COMMAND_DESCRIPTION,
      },
      { command: REPORT_COMMAND_TEXT, description: REPORT_COMMAND_DESCRIPTION },
      {
        command: CATEGORIES_COMMAND_TEXT,
        description: CATEGORIES_COMMAND_DESCRIPTION,
      },
      {
        command: ADD_CATEGORIES_COMMAND_TEXT,
        description: ADD_CATEGORIES_COMMAND_DESCRIPTION,
      },
      {
        command: EDIT_CATEGORIES_COMMAND_TEXT,
        description: EDIT_CATEGORIES_COMMAND_DESCRIPTION,
      },
      {
        command: DELETE_CATEGORIES_COMMAND_TEXT,
        description: DELETE_CATEGORIES_COMMAND_DESCRIPTION,
      },
      { command: HELP_COMMAND_TEXT, description: HELP_COMMAND_DESCRIPTION },
    ]
  }
}
