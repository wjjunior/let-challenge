import { LoadArticlesRepository, LoadArticles, ArticleModel } from './db-load-articles-protocols'

export class DbLoadArticles implements LoadArticles {
  constructor (private readonly loadArticlesRepository: LoadArticlesRepository) {}

  async load (): Promise<ArticleModel[]> {
    const articles = await this.loadArticlesRepository.loadAll()
    return articles
  }
}
