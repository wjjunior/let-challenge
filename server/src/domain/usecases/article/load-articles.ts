import { ArticleModel } from '../../models/article'

export interface LoadArticles {
  load: () => Promise<ArticleModel[]>
}
