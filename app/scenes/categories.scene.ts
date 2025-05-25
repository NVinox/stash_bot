import { Scenes } from "telegraf"
import { IBotContext } from "../context/context.interface"
import { CategoriesMessage } from "../messages/commands/categories.message"
import { CategoiriesKeyboard } from "../buttons/keyboards/categories.keyboard"
import { CATEGORIES_INPUT_NAME } from "../constants/scenes.constants"

export class CotegoriesScene {
  getScene() {
    return new Scenes.WizardScene<IBotContext>(
      "CATEGORIES_SCENE",
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
    await ctx.reply(new CategoriesMessage().getIntroductionHTML(), {
      ...new CategoiriesKeyboard().get(),
      parse_mode: "HTML",
    })
    return await ctx.wizard.next()
  }

  private async setCategoryType(ctx: IBotContext) {
    ctx.scene.session.state.categoryType = ctx.text

    await ctx.reply(CATEGORIES_INPUT_NAME, { parse_mode: "HTML" })
    return await ctx.wizard.next()
  }

  private async setCategoryName(ctx: IBotContext) {
    ctx.scene.session.state.categoryName = ctx.text

    await ctx.reply(JSON.stringify(ctx.scene.session.state))
    return await ctx.scene.leave()
  }
}
