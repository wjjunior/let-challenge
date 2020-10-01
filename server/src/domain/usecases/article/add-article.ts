import { ArticleModel } from '../../models/article'

export type AddArticleParams = {
  title: string
  description: string
  authorId: string
  text: string
  date: Date
}

export interface AddArticle {
  add: (data: AddArticleParams) => Promise<ArticleModel>
}
