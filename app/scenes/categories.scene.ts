import { Scenes } from "telegraf"
import { IBotContext } from "../context/context.interface"
import { CategoriesMessage } from "../messages/commands/categories.message"
import { ErrorHelper } from "../helpers/errors.helper"
import {
  CATEDORIES_SCENE_ID,
  CATEGORIES_INPUT_NAME,
} from "../constants/scenes.constants"

export class CotegoriesScene {
  getScene() {
    return new Scenes.WizardScene<IBotContext>(
      CATEDORIES_SCENE_ID,
      (ctx) => {
        this.start(ctx)
      },
      (ctx) => {
        this.setCategoryType(ctx)
      },
      (ctx) => {
        this.setCategoryName(ctx)
      }
    )
  }

  private async start(ctx: IBotContext) {
    try {
      await ctx.reply(new CategoriesMessage().getIntroductionHTML(), {
        parse_mode: "HTML",
      })
      return await ctx.wizard.next()
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendWizardSceneError(ctx)
    }
  }

  private async setCategoryType(ctx: IBotContext) {
    try {
      ctx.scene.session.state.categoryType = ctx.text

      await ctx.reply(CATEGORIES_INPUT_NAME, { parse_mode: "HTML" })
      return await ctx.wizard.next()
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendWizardSceneError(ctx)
    }
  }

  private async setCategoryName(ctx: IBotContext) {
    try {
      ctx.scene.session.state.categoryName = ctx.text

      await ctx.reply(JSON.stringify(ctx.scene.session.state))
      return await ctx.scene.leave()
    } catch (error) {
      console.log(error)
      await new ErrorHelper().sendWizardSceneError(ctx)
    }
  }
}
