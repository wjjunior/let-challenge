import { AddArticle } from '../../../../../domain/usecases/article/add-article'
import { ArticleMongoRepository } from '../../../../../infra/db/mongodb/article/article-mongo-repository'
import { DbAddArticle } from '../../../../../data/usecases/article/add-article/db-add-article'

export const makeDbAddArticle = (): AddArticle => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbAddArticle(articleMongoRepository)
}
