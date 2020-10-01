import { ArticleMongoRepository } from './article-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { mockAddAccountParams, mockAddArticleParams } from '../../../../domain/test'
import { Collection } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'
import faker from 'faker'

let articleCollection: Collection
let accountCollection: Collection

const makeSut = (): ArticleMongoRepository => {
  return new ArticleMongoRepository()
}

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return MongoHelper.map(res.ops[0])
}

describe('ArticleMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    articleCollection = await MongoHelper.getCollection('articles')
    await articleCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add an article on success', async () => {
      const account = await mockAccount()
      const sut = makeSut()
      await sut.add(mockAddArticleParams(account.id))
      const count = await articleCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all articles on success', async () => {
      const account = await mockAccount()
      const addArticleModels = [mockAddArticleParams(account.id), mockAddArticleParams(account.id)]
      await articleCollection.insertMany(addArticleModels)
      const sut = makeSut()
      const articles = await sut.loadAll()
      expect(articles.length).toBe(2)
      expect(articles[0].id).toBeTruthy()
      expect(articles[0].title).toBe(addArticleModels[1].title)
      expect(articles[1].title).toBe(addArticleModels[0].title)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const articles = await sut.loadAll()
      expect(articles.length).toBe(0)
    })

    describe('loadById()', () => {
      test('Should load article by id on success', async () => {
        const account = await mockAccount()
        const res = await articleCollection.insertOne(mockAddArticleParams(account.id))
        const sut = makeSut()
        const article = await sut.loadById(res.ops[0]._id)
        expect(article).toBeTruthy()
        expect(article.id).toBeTruthy()
      })

      test('Should return invalid param error on wrong ID', async () => {
        const sut = makeSut()
        const article = await sut.loadById(faker.internet.password(12, false, /[0-9A-Z]/))
        expect(article).toBeFalsy()
      })
    })
  })
})
