import { LoadArticleById, ArticleModel, LoadArticleByIdRepository } from './db-load-article-by-id-protocols'

export class DbLoadArticleById implements LoadArticleById {
  constructor (private readonly loadArticleByIdRepository: LoadArticleByIdRepository) {}

  async loadById (id: string): Promise<ArticleModel> {
    const article = await this.loadArticleByIdRepository.loadById(id)
    return article
  }
}
