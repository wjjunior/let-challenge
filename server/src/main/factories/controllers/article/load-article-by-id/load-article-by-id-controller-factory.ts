import { makeDbLoadArticleById } from '../../../usecases/article/load-article-by-id/db-load-article-by-id-factory'
import { Controller } from '../../../../../presentation/protocols'
import { LoadArticleByIdController } from '../../../../../presentation/controllers/article/load-article-by-id/load-article-by-id-controller'

export const makeLoadArticleByIdController = (): Controller => {
  return new LoadArticleByIdController(makeDbLoadArticleById())
}
