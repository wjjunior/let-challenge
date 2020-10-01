import { ArticleMongoRepository } from '../../../../../infra/db/mongodb/article/article-mongo-repository'
import { LoadArticles } from '../../../../../domain/usecases/article/load-articles'
import { DbLoadArticles } from '../../../../../data/usecases/article/load-articles/db-load-articles'

export const makeDbLoadArticles = (): LoadArticles => {
  const articleMongoRepository = new ArticleMongoRepository()
  return new DbLoadArticles(articleMongoRepository)
}
