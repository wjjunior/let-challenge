import { ArticleModel } from '../../../../domain/models/article'
import { AddArticle, AddArticleParams, AddArticleRepository } from './db-add-article-protocols'

export class DbAddArticle implements AddArticle {
  constructor (private readonly addArticleRepository: AddArticleRepository) {}

  async add (data: AddArticleParams): Promise<ArticleModel> {
    return await this.addArticleRepository.add(data)
  }
}
