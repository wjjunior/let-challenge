import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../../../main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../../../main/factories/usecases/account/add-account/db-add-account'
import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  return new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )
}
