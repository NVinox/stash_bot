import { createLogger, format, transports, Logger } from "winston"
import { Message } from "telegraf/typings/core/types/typegram"
import { INTERNAL_ERROR_TEXT } from "../constants/errors.constants"
import { IBotContext } from "../context/context.interface"

interface IError {
  sendInternalError: (
    ctx: IBotContext,
    error: unknown
  ) => Promise<Message.TextMessage>
  sendWizardSceneError: (
    ctx: IBotContext,
    error: unknown,
    isBack?: boolean
  ) => Promise<void>
}

export class ErrorHelper implements IError {
  async sendInternalError(ctx: IBotContext, error: unknown) {
    this.getLogger().error({ message: error })
    return await ctx.reply(INTERNAL_ERROR_TEXT, { parse_mode: "HTML" })
  }

  async sendWizardSceneError(ctx: IBotContext, error: unknown) {
    this.getLogger().error({ message: error })
    await ctx.reply(INTERNAL_ERROR_TEXT, { parse_mode: "HTML" })
    await ctx.scene.reenter()
  }

  private getLogger(): Logger {
    const { combine, label, timestamp, prettyPrint } = format

    return createLogger({
      level: "error",
      format: combine(label({ label: "Error" }), timestamp(), prettyPrint()),
      transports: [
        new transports.File({
          dirname: "logs",
          filename: "error.log",
          level: "error",
        }),
      ],
    })
  }
}
