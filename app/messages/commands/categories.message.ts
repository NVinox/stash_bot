import { CATEGORIES_START_MESSAGE } from "../../constants/messages.constants"

interface ICategoriesMessages {
  getIntroductionHTML(): string
}

export class CategoriesMessage implements ICategoriesMessages {
  getIntroductionHTML() {
    return CATEGORIES_START_MESSAGE
  }
}
