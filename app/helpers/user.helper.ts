import { IBotContext } from "../context/context.interface"
import { IUserTelegram } from "../interfaces/user.interface"

interface IUserHelper {
  getId: () => number
  getFirstName: () => string
  getUserName: () => string
  getUserDTO: () => IUserTelegram
}

export class UserHelper implements IUserHelper {
  protected id: number
  protected firstName: string
  protected userName: string

  constructor(ctx: IBotContext) {
    this.id = ctx.message?.from.id!
    this.firstName = ctx.message?.from.first_name!
    this.userName = ctx.message?.from.username!
  }

  getId(): number {
    return this.id
  }

  getFirstName(): string {
    return this.firstName
  }

  getUserName(): string {
    return this.userName
  }

  getUserDTO(): IUserTelegram {
    return {
      id: this.getId(),
      name: this.getUserName(),
    }
  }
}
