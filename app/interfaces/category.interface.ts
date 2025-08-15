export interface ICategoryModel {
  id?: number
  userId: number
  title: string
  createdAt?: string
  updatedAt?: string
}

export interface ICreateCategory {
  type: string
  title: string
  userId: number
}
