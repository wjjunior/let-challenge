import { Controller, HttpRequest, HttpResponse, Validation, AddArticle } from './add-article-controller-protocols'
import { badRequest, serverError, ok } from '../../../../presentation/helpers/http/http-helper'

export class AddArticleController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addArticle: AddArticle
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { title, description, text } = httpRequest.body
      const article = await this.addArticle.add({
        title,
        description,
        text,
        authorId: httpRequest.accountId,
        date: new Date()
      })
      return ok(article)
    } catch (error) {
      return serverError(error)
    }
  }
}
