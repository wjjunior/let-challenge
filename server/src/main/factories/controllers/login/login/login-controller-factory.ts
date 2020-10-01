import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../../../factories/usecases/account/authentication/db-authentication-factory'
import { Controller } from '../../../../../presentation/protocols'
import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'

export const makeLoginController = (): Controller => {
  return new LoginController(makeDbAuthentication(), makeLoginValidation())
}
