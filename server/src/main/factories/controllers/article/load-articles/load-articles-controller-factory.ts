import { makeDbLoadArticles } from '../../../usecases/article/load-articles/db-load-articles-factory'
import { Controller } from '../../../../../presentation/protocols'
import { LoadArticlesController } from '../../../../../presentation/controllers/article/load-articles/load-articles-controller'

export const makeLoadArticlesController = (): Controller => {
  return new LoadArticlesController(makeDbLoadArticles())
}
