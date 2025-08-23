import { Markup } from "telegraf"
import { IBotContext } from "../context/context.interface"

export class AsyncMessage {
  static async sendWithProgress<T>(
    cb: () => Promise<T>,
    ctx: IBotContext,
    progressText: string,
    isDeleteKeyboard: boolean = true
  ) {
    let messageId: number

    if (isDeleteKeyboard) {
      messageId = (
        await ctx.replyWithHTML(progressText, Markup.removeKeyboard())
      ).message_id
    } else {
      messageId = (await ctx.replyWithHTML(progressText)).message_id
    }

    const data = await cb()
    await ctx.deleteMessage(messageId)

    return data
  }
}
