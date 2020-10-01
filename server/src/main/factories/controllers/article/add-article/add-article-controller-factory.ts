import { makeAddArticleValidation } from './add-article-validation-factory'
import { makeDbAddArticle } from '../../../usecases/article/add-article/db-add-article-factory'
import { Controller } from '../../../../../presentation/protocols'
import { AddArticleController } from '../../../../../presentation/controllers/article/add-article/add-article-controller'

export const makeAddArticleController = (): Controller => {
  return new AddArticleController(makeAddArticleValidation(), makeDbAddArticle())
}
