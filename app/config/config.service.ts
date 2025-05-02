import { config, DotenvParseOutput } from "dotenv"

import { IConfigService } from "./config.interface"

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput

  constructor() {
    const { error, parsed } = config()

    if (error) {
      throw new Error("Файл .env не найден")
    }

    if (!parsed) {
      throw new Error("Файл .env пуст")
    }

    this.config = parsed
  }

  get(key: string): string {
    const response = this.config[key]

    if (!response) {
      throw new Error("Данный ключ отсутствует")
    }

    return response
  }
}
