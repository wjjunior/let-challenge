import { makeDbLoadAccountByToken } from '../../../usecases/account/load-account-by-token/db-load-account-by-token-factory'
import { Controller } from '../../../../../presentation/protocols'
import { LoadAccountByTokenController } from '../../../../../presentation/controllers/login/load-account-by-token/load-account-by-token-controller'

export const makeLoadAccountByTokenController = (): Controller => {
  return new LoadAccountByTokenController(makeDbLoadAccountByToken())
}
