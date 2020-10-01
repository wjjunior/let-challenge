import { HttpRequest } from '../../../protocols'
import { AddArticleController } from './add-article-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { ValidationSpy, AddArticleSpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    title: faker.random.words(),
    description: faker.random.words(),
    text: faker.lorem.text(),
    date: new Date()
  },
  accountId: faker.random.uuid()
})

type SutTypes = {
  sut: AddArticleController
  validationSpy: ValidationSpy
  addArticleSpy: AddArticleSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addArticleSpy = new AddArticleSpy()
  const sut = new AddArticleController(validationSpy, addArticleSpy)
  return {
    sut,
    validationSpy,
    addArticleSpy: addArticleSpy
  }
}

describe('AddArticle Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddArticle with correct values', async () => {
    const { sut, addArticleSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addArticleSpy.addArticleParams).toEqual(Object.assign(httpRequest.body, { authorId: httpRequest.accountId }))
  })

  test('Should return 500 if AddArticle throws', async () => {
    const { sut, addArticleSpy } = makeSut()
    jest.spyOn(addArticleSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(Object.assign(httpRequest.body, { authorId: httpRequest.accountId }))
    expect(httpResponse.statusCode).toEqual(200)
  })
})
