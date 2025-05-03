import { config, DotenvParseOutput } from "dotenv"

import { IConfigService } from "./config.interface"

import {
  ENV_EMPTY,
  ENV_NOT_FOUND,
  ENV_KEY_NOT_EXIST,
} from "../constants/env.constants"

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput

  constructor() {
    const { error, parsed } = config()

    if (error) {
      throw new Error(ENV_NOT_FOUND)
    }

    if (!parsed) {
      throw new Error(ENV_EMPTY)
    }

    this.config = parsed
  }

  get(key: string): string {
    const response = this.config[key]

    if (!response) {
      throw new Error(ENV_KEY_NOT_EXIST)
    }

    return response
  }
}
