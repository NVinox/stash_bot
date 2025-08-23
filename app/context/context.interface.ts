import { Context, Scenes } from "telegraf"
import { SceneSessionData } from "telegraf/typings/scenes"
import { ICreateCategory } from "../interfaces/category.interface"

interface WizardSceneSessionData extends SceneSessionData {
  createCategory: ICreateCategory
}

interface ISession extends Scenes.WizardSessionData {
  state: WizardSceneSessionData
}

export interface IBotContext extends Context {
  scene: Scenes.SceneContextScene<IBotContext, ISession>
  wizard: Scenes.WizardContextWizard<IBotContext>
}
