export class ValidatorMessage {
  static getNotCorrectStringLength(length: number = 20): string {
    return `Количество символов не должно превышать ${length}. Попробуйте еще раз`
  }
}
