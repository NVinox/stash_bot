import { Telegraf } from "telegraf"
import { Command } from "./command.class"
import { IBotContext } from "../context/context.interface"
import { StartMessage } from "../messages/commands/start.message"
import { ErrorHelper } from "../helpers/errors.helper"
import { UserHelper } from "../helpers/user.helper"
import { User } from "../database/models/user.model"
import { CategoryIncome } from "../database/models/categoryIncome.model"
import { CategoryExpense } from "../database/models/categoryExpense.model"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start(this.clickCommand)
  }

  private async clickCommand(ctx: IBotContext) {
    try {
      const firstName = new UserHelper(ctx).getFirstName()
      const userInDB = await User.findOne({
        where: { telegramId: new UserHelper(ctx).getId() },
        include: [CategoryIncome, CategoryExpense],
      })

      if (!userInDB) {
        await User.create({
          telegramId: new UserHelper(ctx).getId(),
          name: new UserHelper(ctx).getUserName(),
        })
      }

      return await ctx.replyWithHTML(new StartMessage().getHTML(firstName))
    } catch (error: unknown) {
      await new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
