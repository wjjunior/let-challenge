import { ArticleModel } from '../../../../domain/models/article'

export interface LoadArticleByIdRepository {
  loadById: (id: string) => Promise<ArticleModel>
}
