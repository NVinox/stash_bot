export interface IUserTelegram {
  id: number
  name: string
}

export interface IUserModel {
  id?: number
  telegramId: number
  name: string
  createdAt?: string
  updatedAt?: string
}
