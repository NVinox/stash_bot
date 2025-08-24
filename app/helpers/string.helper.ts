export class StringHelper {
  static capitalizeFirstLetter(text: string): string {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1)
  }

  static generateCallbackData(prefix: string, uniqueId: string): string {
    return `${prefix}-${uniqueId}`
  }
}
