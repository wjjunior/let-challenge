import { LoadAccountByTokenController } from './load-account-by-token-controller'
import { HttpRequest } from './load-account-by-token-controller-protocols'
import { ok, serverError, forbidden } from '../../../helpers/http/http-helper'
import { LoadAccountByTokenSpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import faker from 'faker'
import { InvalidParamError } from '../../../errors'

const mockRequest = (): HttpRequest => ({
  body: {
    id: faker.random.uuid()
  }
})

type SutTypes = {
  sut: LoadAccountByTokenController
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new LoadAccountByTokenController(loadAccountByTokenSpy)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('LoadAccountByToken Controller', () => {
  test('Should call LoadAccountByAccessToken with correct value', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.body.accessToken)
  })

  test('Should return 403 if LoadAccountByAccessToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.accountModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('accessToken')))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadAccountByTokenSpy.accountModel))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
