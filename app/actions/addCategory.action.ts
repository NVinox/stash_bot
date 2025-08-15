import { Telegraf } from "telegraf"
import { Command } from "../abstract/command.abstract"
import { IBotContext } from "../context/context.interface"
import { ErrorHelper } from "../helpers/errors.helper"
import { ADD_CATEGORY } from "../constants/keyboards.constants"
import { ADD_CATEGORY_SCENE_ID } from "../constants/scenes.constants"

export class AddCategoryAction extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.on("text", this.handleAction)
  }

  private async handleAction(ctx: IBotContext) {
    try {
      if (ctx.text === ADD_CATEGORY) {
        return await ctx.scene.enter(ADD_CATEGORY_SCENE_ID)
      }
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
