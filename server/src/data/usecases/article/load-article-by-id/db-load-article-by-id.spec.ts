import { DbLoadArticleById } from './db-load-article-by-id'
import { LoadArticleByIdRepositorySpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadArticleById
  loadArticleByIdRepositorySpy: LoadArticleByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadArticleByIdRepositorySpy = new LoadArticleByIdRepositorySpy()
  const sut = new DbLoadArticleById(loadArticleByIdRepositorySpy)
  return {
    sut,
    loadArticleByIdRepositorySpy
  }
}

let articleId: string

describe('DbLoadArticleById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    articleId = faker.random.uuid()
  })

  test('Should call LoadArticleByIdRepository', async () => {
    const { sut, loadArticleByIdRepositorySpy } = makeSut()
    await sut.loadById(articleId)
    expect(loadArticleByIdRepositorySpy.id).toBe(articleId)
  })

  test('Should return Article on success', async () => {
    const { sut, loadArticleByIdRepositorySpy } = makeSut()
    const article = await sut.loadById(articleId)
    expect(article).toEqual(loadArticleByIdRepositorySpy.articleModel)
  })

  test('Should throw if LoadArticleByIdRepository throws', async () => {
    const { sut, loadArticleByIdRepositorySpy } = makeSut()
    jest.spyOn(loadArticleByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(articleId)
    await expect(promise).rejects.toThrow()
  })
})
