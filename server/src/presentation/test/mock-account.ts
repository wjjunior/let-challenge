import {
  AddAccount,
  AddAccountParams
} from '../../domain/usecases/account/add-account'
import {
  Authentication,
  AuthenticationParams
} from '../../domain/usecases/account/authentication'
import { AccountModel } from '../../domain/models/account'
import { AuthenticationModel } from '../../domain/models/authentication'
import { mockAccountModel } from '../../domain/test'
import faker from 'faker'
import { LoadAccountByToken } from '../../domain/usecases/account/load-account-by-token'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel(faker.random.uuid())
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return this.accountModel
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (
    authenticationParams: AuthenticationParams
  ): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel(faker.random.uuid())
  accessToken: string

  async load (accessToken: string): Promise<AccountModel> {
    this.accessToken = accessToken
    return this.accountModel
  }
}
