import { LoadArticleByIdController } from './load-article-by-id-controller'
import { HttpRequest } from './load-article-by-id-controller-protocols'
import { ok, serverError, forbidden } from '../../../helpers/http/http-helper'
import { LoadArticleByIdSpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import faker from 'faker'
import { InvalidParamError } from '../../../errors'

const mockRequest = (): HttpRequest => ({
  body: {
    id: faker.random.uuid()
  }
})

type SutTypes = {
  sut: LoadArticleByIdController
  loadArticleByIdSpy: LoadArticleByIdSpy
}

const makeSut = (): SutTypes => {
  const loadArticleByIdSpy = new LoadArticleByIdSpy()
  const sut = new LoadArticleByIdController(loadArticleByIdSpy)
  return {
    sut,
    loadArticleByIdSpy
  }
}

describe('LoadArticleById Controller', () => {
  test('Should call LoadArticleById with correct value', async () => {
    const { sut, loadArticleByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadArticleByIdSpy.id).toBe(httpRequest.body.id)
  })

  test('Should return 403 if LoadArticleById returns null', async () => {
    const { sut, loadArticleByIdSpy } = makeSut()
    loadArticleByIdSpy.articleModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadArticleByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadArticleByIdSpy.articleModel))
  })

  test('Should return 500 if LoadArticleById throws', async () => {
    const { sut, loadArticleByIdSpy } = makeSut()
    jest.spyOn(loadArticleByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
