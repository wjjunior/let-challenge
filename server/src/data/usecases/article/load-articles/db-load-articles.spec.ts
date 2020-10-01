import { DbLoadArticles } from './db-load-articles'
import { LoadArticlesRepositorySpy } from '../../../test'
import { throwError } from '../../../../domain/test'

type SutTypes = {
  sut: DbLoadArticles
  loadArticlesRepositorySpy: LoadArticlesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadArticlesRepositorySpy = new LoadArticlesRepositorySpy()
  const sut = new DbLoadArticles(loadArticlesRepositorySpy)
  return {
    sut,
    loadArticlesRepositorySpy
  }
}

describe('DbLoadArticles', () => {
  test('Should return a list of Articles on success', async () => {
    const { sut, loadArticlesRepositorySpy } = makeSut()
    const articles = await sut.load()
    expect(articles).toEqual(loadArticlesRepositorySpy.articleModels)
  })

  test('Should throw if LoadArticlesRepository throws', async () => {
    const { sut, loadArticlesRepositorySpy } = makeSut()
    jest.spyOn(loadArticlesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
