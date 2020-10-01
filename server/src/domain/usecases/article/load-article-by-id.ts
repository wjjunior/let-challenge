import { ArticleModel } from '../../models/article'

export interface LoadArticleById {
  loadById: (id: string) => Promise<ArticleModel>
}
