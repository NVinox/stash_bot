import { Context, Scenes } from "telegraf"
import { SceneSessionData } from "telegraf/typings/scenes"

interface WizardSceneSessionData extends SceneSessionData {
  categoryType?: string
  categoryName?: string
}

interface ISession extends Scenes.WizardSessionData {
  state: WizardSceneSessionData
}

export interface IBotContext extends Context {
  scene: Scenes.SceneContextScene<IBotContext, ISession>
  wizard: Scenes.WizardContextWizard<IBotContext>
}
