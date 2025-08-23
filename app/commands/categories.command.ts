import { Telegraf } from "telegraf"
import { Command } from "../abstract/command.abstract"
import { IBotContext } from "../context/context.interface"
import { UserHelper } from "../helpers/user.helper"
import { ErrorHelper } from "../helpers/errors.helper"
import { AsyncMessage } from "../helpers/asyncMessage.helper"
import { CategoryService } from "../services/category.service"
import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"
import { CATEGORIES_COMMAND_TEXT } from "../constants/commands.constants"
import {
  ADD_CATEGORY_SCENE_ID,
  GET_CATEGORIES_PROGRESS_TEXT,
} from "../constants/scenes.constants"

export class CategoriesCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(CATEGORIES_COMMAND_TEXT, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      const isHasCategories = await CategoryService.isHasUserCategories(
        new UserHelper(ctx).getId()
      )

      if (isHasCategories) {
        const categoryMessage = await AsyncMessage.sendWithProgress<string>(
          async () => {
            return await CategoryService.getUserCategories(
              new UserHelper(ctx).getId()
            )
          },
          ctx,
          GET_CATEGORIES_PROGRESS_TEXT
        )
        return await ctx.replyWithHTML(
          categoryMessage,
          CategoiriesKeyboard.get()
        )
      } else {
        return await ctx.scene.enter(ADD_CATEGORY_SCENE_ID)
      }
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
