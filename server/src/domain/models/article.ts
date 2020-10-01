import { AccountModel } from './account'

export type ArticleModel = {
  id: string
  title: string
  description: string
  author: AccountModel
  text: string
  date: Date
}
