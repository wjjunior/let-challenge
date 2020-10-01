import { ArticleModel } from '@/domain/models/article'
import { AddArticleParams } from '../../../../domain/usecases/article/add-article'

export interface AddArticleRepository {
  add: (data: AddArticleParams) => Promise<ArticleModel>
}
