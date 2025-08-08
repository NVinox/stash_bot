import { ConfigService } from "../config/config.service"

const configService = new ConfigService()

const config = {
  db: {
    host: "localhost",
    port: parseInt(configService.get("MYSQL_PORT") || "3306"),
    username: configService.get("MYSQL_USER"),
    password: configService.get("MYSQL_PASSWORD"),
    database: configService.get("MYSQL_DATABASE"),
    dialect: "mysql",
  },
}

export default config
