import {
  HELP_START_LINE,
  HELP_SECOND_LINE,
  HELP_THIRD_LINE,
  HELP_FOURTH_LINE,
  HELP_FINAL_LINE,
} from "../../constants/messages.constants"

interface IHelpMessages {
  getHTML(): string
}

export class HelpMessage implements IHelpMessages {
  getHTML(): string {
    return `${HELP_START_LINE}\n\n${HELP_SECOND_LINE}\n\n${HELP_THIRD_LINE}\n\n${HELP_FOURTH_LINE}\n\n${HELP_FINAL_LINE}\n\n`
  }
}
