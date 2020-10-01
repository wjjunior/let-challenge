import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadArticles
} from './load-articles-controller-protocols'
import { ok, serverError, noContent } from '../../../helpers/http/http-helper'

export class LoadArticlesController implements Controller {
  constructor (private readonly loadArticles: LoadArticles) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const articles = await this.loadArticles.load()
      return articles.length ? ok(articles) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
