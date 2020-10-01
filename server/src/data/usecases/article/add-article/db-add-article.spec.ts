import { DbAddArticle } from './db-add-article'
import { AddArticleRepositorySpy } from '../../../test'
import { throwError, mockAddArticleParams } from '../../../../domain/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddArticle
  addArticleRepositorySpy: AddArticleRepositorySpy
}

const makeSut = (): SutTypes => {
  const addArticleRepositorySpy = new AddArticleRepositorySpy()
  const sut = new DbAddArticle(addArticleRepositorySpy)
  return {
    sut,
    addArticleRepositorySpy
  }
}

describe('DbAddArticle Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddArticleRepository with correct values', async () => {
    const { sut, addArticleRepositorySpy } = makeSut()
    const articleData = mockAddArticleParams()
    await sut.add(articleData)
    expect(addArticleRepositorySpy.addArticleParams).toEqual(articleData)
  })

  test('Should throw if AddArticleRepository throws', async () => {
    const { sut, addArticleRepositorySpy } = makeSut()
    jest.spyOn(addArticleRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddArticleParams())
    await expect(promise).rejects.toThrow()
  })
})
