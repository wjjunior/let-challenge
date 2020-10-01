import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadAccountByToken
} from './load-account-by-token-controller-protocols'
import { ok, serverError, forbidden } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors'

export class LoadAccountByTokenController implements Controller {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest.body
      const account = await this.loadAccountByToken.load(accessToken)
      return account ? ok(account) : forbidden(new InvalidParamError('accessToken'))
    } catch (error) {
      return serverError(error)
    }
  }
}
