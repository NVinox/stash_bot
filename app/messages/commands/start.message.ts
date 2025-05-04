import {
  START_GREETING,
  START_FIRST_LINE,
  START_SECOND_LINE,
  START_THIRD_LINE,
} from "../../constants/messages.constants"

interface IStartMessages {
  getHTML(userName?: string): string
}

export class StartMessage implements IStartMessages {
  getHTML(userName?: string): string {
    const title = userName
      ? `${START_GREETING}, <b>${userName}</b>!`
      : `${START_GREETING}!`

    return `${title}\n\n${START_FIRST_LINE}\n\n${START_SECOND_LINE}\n\n${START_THIRD_LINE}`
  }
}
