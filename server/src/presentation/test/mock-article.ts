import { ArticleModel } from '../../domain/models/article'
import {
  AddArticle,
  AddArticleParams
} from '../../domain/usecases/article/add-article'
import { mockArticlesModel, mockArticleModel } from '../../domain/test'
import { LoadArticles } from '../controllers/article/load-articles/load-articles-controller-protocols'
import { LoadArticleById } from '../../domain/usecases/article/load-article-by-id'

export class AddArticleSpy implements AddArticle {
  addArticleParams: AddArticleParams
  id: string
  async add (data: AddArticleParams): Promise<ArticleModel> {
    this.addArticleParams = data
    return { id: this.id, ...this.addArticleParams }
  }
}

export class LoadArticlesSpy implements LoadArticles {
  articleModels = mockArticlesModel()

  async load (): Promise<ArticleModel[]> {
    return this.articleModels
  }
}

export class LoadArticleByIdSpy implements LoadArticleById {
  articleModel = mockArticleModel()
  id: string

  async loadById (id: string): Promise<ArticleModel> {
    this.id = id
    return this.articleModel
  }
}
