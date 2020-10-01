import { AddArticleRepository } from '../protocols/db/article/add-article-repository'
import { AddArticleParams } from '../usecases/article/add-article/db-add-article-protocols'
import {
  ArticleModel,
  LoadArticlesRepository
} from '../usecases/article/load-articles/db-load-articles-protocols'
import { LoadArticleByIdRepository } from '../../data/protocols/db/article/load-article-by-id-repository'
import { mockArticleModel, mockArticlesModel } from '../../domain/test'
import { AccountModel } from '../usecases/account/add-account/db-add-account-protocols'

export class AddArticleRepositorySpy implements AddArticleRepository {
  addArticleParams: AddArticleParams
  id: string
  authorModel: AccountModel

  async add (data: AddArticleParams): Promise<ArticleModel> {
    this.addArticleParams = data
    return { id: this.id, author: this.authorModel, ...this.addArticleParams }
  }
}

export class LoadArticleByIdRepositorySpy implements LoadArticleByIdRepository {
  articleModel = mockArticleModel()
  id: string

  async loadById (id: string): Promise<ArticleModel> {
    this.id = id
    return this.articleModel
  }
}

export class LoadArticlesRepositorySpy implements LoadArticlesRepository {
  articleModels = mockArticlesModel()
  accountId: string

  async loadAll (): Promise<ArticleModel[]> {
    return this.articleModels
  }
}
