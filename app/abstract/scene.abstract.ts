import { Scenes } from "telegraf"
import { IBotContext } from "../context/context.interface"

export abstract class AScene {
  abstract getScene(): Scenes.WizardScene<IBotContext>
}
