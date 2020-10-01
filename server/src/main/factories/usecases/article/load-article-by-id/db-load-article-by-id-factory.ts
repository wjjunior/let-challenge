import { ArticleMongoRepository } from '../../../../../infra/db/mongodb/article/article-mongo-repository'
import { LoadArticleById } from '../../../../../domain/usecases/article/load-article-by-id'
import { DbLoadArticleById } from '../../../../../data/usecases/article/load-article-by-id/db-load-article-by-id'

export const makeDbLoadArticleById = (): LoadArticleById => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbLoadArticleById(articleMongoRepository)
}
