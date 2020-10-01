import { LoadArticlesController } from './load-articles-controller'
import { HttpRequest } from './load-articles-controller-protocols'
import { ok, serverError, noContent } from '../../../helpers/http/http-helper'
import { LoadArticlesSpy } from '../../../test'
import { throwError } from '../../../../domain/test'

const mockRequest = (): HttpRequest => ({})

type SutTypes = {
  sut: LoadArticlesController
  loadArticlesSpy: LoadArticlesSpy
}

const makeSut = (): SutTypes => {
  const loadArticlesSpy = new LoadArticlesSpy()
  const sut = new LoadArticlesController(loadArticlesSpy)
  return {
    sut,
    loadArticlesSpy
  }
}

describe('LoadArticles Controller', () => {
  test('Should return 200 on success', async () => {
    const { sut, loadArticlesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadArticlesSpy.articleModels))
  })

  test('Should return 204 if LoadArticles returns empty', async () => {
    const { sut, loadArticlesSpy } = makeSut()
    loadArticlesSpy.articleModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadArticles throws', async () => {
    const { sut, loadArticlesSpy } = makeSut()
    jest.spyOn(loadArticlesSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
