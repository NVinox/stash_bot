import { Message } from "telegraf/typings/core/types/typegram"
import { INTERNAL_ERROR_TEXT } from "../constants/errors.constants"
import { IBotContext } from "../context/context.interface"

interface IError {
  sendInternalError: (ctx: IBotContext) => Promise<Message.TextMessage>
  sendWizardSceneError: (ctx: IBotContext, isBack?: boolean) => Promise<void>
}

export class ErrorHelper implements IError {
  async sendInternalError(ctx: IBotContext) {
    return await ctx.reply(INTERNAL_ERROR_TEXT, { parse_mode: "HTML" })
  }

  async sendWizardSceneError(ctx: IBotContext) {
    await ctx.reply(INTERNAL_ERROR_TEXT, { parse_mode: "HTML" })
    await ctx.scene.reenter()
  }
}
