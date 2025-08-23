import {
  CATEGORY_TYPE_EXPENSES,
  CATEGORY_TYPE_INCOME,
} from "../constants/keyboards.constants"

export class ValidatorHelper {
  static isCorrectCategoryType(type?: string): boolean {
    return type === CATEGORY_TYPE_EXPENSES || type === CATEGORY_TYPE_INCOME
  }

  static isCorrectStringLength(text: string, length: number = 20): boolean {
    return text.length <= length
  }

  static isStringNumber(text: string) {
    return !isNaN(Number(text))
  }
}
