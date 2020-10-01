import {
  createTestClient,
  ApolloServerTestClient
} from 'apollo-server-testing'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { typeDefs, resolvers } from '../'
import { ApolloServer } from 'apollo-server'
import env from '../../config/env'
import faker from 'faker'
import { sign } from 'jsonwebtoken'
import {
  mockAddAccountParams,
  mockAddArticleInput,
  mockAddArticleParams
} from '../../../domain/test'
import { AccountModel } from '../../../domain/models/account'

let articlesCollection: Collection
let accountCollection: Collection

const authorName = faker.name.firstName()

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: authorName,
    email: faker.internet.email(),
    password: faker.internet.password()
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    {
      _id: id
    },
    {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

interface SutTypes {
  sut: ApolloServerTestClient
}

const makeSut = (): SutTypes => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      const token = `Bearer ${await mockAccessToken()}`
      return { token }
    }
  })
  const sut = createTestClient(server)
  return {
    sut
  }
}

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return MongoHelper.map(res.ops[0])
}

describe('Article Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    articlesCollection = await MongoHelper.getCollection('articles')
    await articlesCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Add Article Mutation', () => {
    test('Should add a new Article', async () => {
      const { sut } = makeSut()
      const CREATE_ARTICLE = `
            mutation createArticle($input: ArticleInput!) {
              createArticle(input: $input) {
                id,
                title,
                description,
                text,
                author {
                  name
                },
                date
              }
            }
          `
      const fakeArticleInput = mockAddArticleInput()

      const res = await sut.mutate({
        mutation: CREATE_ARTICLE,
        variables: { input: fakeArticleInput }
      })
      expect(res.data.createArticle.id).toBeTruthy()
      expect(res.data.createArticle.title).toEqual(fakeArticleInput.title)
      expect(res.data.createArticle.author.name).toEqual(authorName)
    })
  })

  describe('Load All Articles Query', () => {
    test('Should load all articles', async () => {
      const account = await mockAccount()
      const addArticleModels = [
        mockAddArticleParams(account.id),
        mockAddArticleParams(account.id)
      ]
      await articlesCollection.insertMany(addArticleModels)
      const { sut } = makeSut()
      const LOAD_ALL_ARTICLES = `
            query articles {
              articles {
                id,
                title,
                description,
                text,
                author {
                  id
                  name
                },
                date
              }
            }
          `
      const res = await sut.query({
        query: LOAD_ALL_ARTICLES
      })
      expect(res.data.articles.length).toBe(2)
    })
  })

  describe('Load Article By Id Query', () => {
    test('Should load article by ID', async () => {
      const account = await mockAccount()
      const fakeArticle = mockAddArticleParams(account.id)
      const article = await articlesCollection.insertOne(fakeArticle)
      const { sut } = makeSut()
      const LOAD_ARTICLE_BY_ID = `
            query article($id: ID!) {
              article(id: $id) {
                id,
                title,
                description,
                text,
                author {
                  id
                  name
                },
                date
              }
            }
          `
      const res = await sut.query({
        query: LOAD_ARTICLE_BY_ID,
        variables: { id: (article.ops[0]._id).toString() }
      })

      expect(res.data.article.title).toEqual(fakeArticle.title)
      expect(res.data.article.author.name).toEqual(account.name)
    })
  })
})
