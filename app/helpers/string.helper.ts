export class StringHelper {
  static capitalizeFirstLetter(text: string) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1)
  }
}
