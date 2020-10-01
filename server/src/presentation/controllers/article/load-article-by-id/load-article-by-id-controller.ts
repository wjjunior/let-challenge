import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadArticleById
} from './load-article-by-id-controller-protocols'
import { ok, serverError, forbidden } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors'

export class LoadArticleByIdController implements Controller {
  constructor (private readonly loadArticleById: LoadArticleById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.body
      const article = await this.loadArticleById.loadById(id)
      return article ? ok(article) : forbidden(new InvalidParamError('id'))
    } catch (error) {
      return serverError(error)
    }
  }
}
