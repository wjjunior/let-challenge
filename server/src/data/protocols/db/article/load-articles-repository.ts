import { ArticleModel } from '../../../../domain/models/article'

export interface LoadArticlesRepository {
  loadAll: () => Promise<ArticleModel[]>
}
