import {
  createTestClient,
  ApolloServerTestClient
} from 'apollo-server-testing'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { typeDefs, resolvers } from '../'
import { ApolloServer } from 'apollo-server'
import faker from 'faker'

let accountCollection: Collection

interface SutTypes {
  sut: ApolloServerTestClient
}

const makeSut = (): SutTypes => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  const sut = createTestClient(server)
  return {
    sut
  }
}

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('signUp', () => {
    test('Should add a new Account on SignUp', async () => {
      const { sut } = makeSut()
      const SIGN_UP = `
          mutation signup($input: AccountInput!) {
            signup(input: $input) {
              accessToken,
              name
            }
          }
        `
      const fakePassword = faker.internet.password()
      const fakeName = faker.internet.userName()
      const res = await sut.mutate({
        mutation: SIGN_UP,
        variables: { input: { name: fakeName, email: faker.internet.email(), password: fakePassword, passwordConfirmation: fakePassword } }
      })
      expect(res.data.signup.accessToken).toBeTruthy()
      expect(res.data.signup.name).toEqual(fakeName)
    })
  })

  describe('login', () => {
    test('Should return an accessToken on Login', async () => {
      const { sut } = makeSut()
      const SIGN_UP = `
          mutation signup($input: AccountInput!) {
            signup(input: $input) {
              accessToken,
              name
            }
          }
        `

      const fakeAccount = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      await sut.mutate({
        mutation: SIGN_UP,
        variables: { input: { name: fakeAccount.name, email: fakeAccount.email, password: fakeAccount.password, passwordConfirmation: fakeAccount.password } }
      })

      const LOGIN = `
          mutation login($input: LoginInput!) {
            login(input: $input) {
              accessToken,
              name
            }
          }
        `
      const res = await sut.mutate({
        mutation: LOGIN,
        variables: { input: { email: fakeAccount.email, password: fakeAccount.password } }
      })
      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toEqual(fakeAccount.name)
    })

    test('Can query an account by accessToken', async () => {
      const { sut } = makeSut()
      const SIGN_UP = `
          mutation signup($input: AccountInput!) {
            signup(input: $input) {
              accessToken,
              name
            }
          }
        `

      const fakeAccount = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      const resSignUp = await sut.mutate({
        mutation: SIGN_UP,
        variables: { input: { name: fakeAccount.name, email: fakeAccount.email, password: fakeAccount.password, passwordConfirmation: fakeAccount.password } }
      })

      const ACCOUNT_BY_TOKEN = `
          query accountByToken($accessToken: String!) {
            accountByToken(accessToken: $accessToken) {
              name
            }
          }
        `
      const res = await sut.query({
        query: ACCOUNT_BY_TOKEN,
        variables: { accessToken: resSignUp.data.signup.accessToken }
      })
      expect(res.data.accountByToken.name).toEqual(fakeAccount.name)
    })
  })
})
