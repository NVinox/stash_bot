import { Telegraf } from "telegraf"
import { Command } from "../abstract/command.abstract"
import { IBotContext } from "../context/context.interface"
import { ErrorHelper } from "../helpers/errors.helper"
import { DELETE_CATEGORY } from "../constants/keyboards.constants"
import { DELETE_CATEGORY_SCENE_ID } from "../constants/scenes.constants"

export class DeleteCategoryAction extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.hears(DELETE_CATEGORY, this.handleAction)
  }

  private async handleAction(ctx: IBotContext) {
    try {
      return await ctx.scene.enter(DELETE_CATEGORY_SCENE_ID)
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
