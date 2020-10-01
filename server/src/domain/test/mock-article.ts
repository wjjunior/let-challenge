import { ArticleModel } from '../models/article'
import { AddArticleParams } from '../usecases/article/add-article'
import { mockAccountModel } from './mock-account'
import faker from 'faker'

export const mockArticleModel = (authorId: string = null): ArticleModel => {
  return {
    id: faker.random.uuid(),
    title: faker.random.words(),
    description: faker.random.words(),
    author: mockAccountModel(authorId || faker.random.uuid()),
    text: faker.lorem.text(),
    date: faker.date.recent()
  }
}

export const mockArticlesModel = (authorId: string = null): ArticleModel[] => [
  mockArticleModel(authorId || faker.random.uuid()),
  mockArticleModel(authorId || faker.random.uuid())
]

export const mockAddArticleParams = (authorId: string = null): AddArticleParams => ({
  title: faker.random.words(),
  description: faker.random.words(),
  authorId: authorId || faker.random.uuid(),
  text: faker.lorem.text(),
  date: faker.date.recent()
})

export const mockAddArticleInput = (): Omit<AddArticleParams, 'authorId'|'date'> => ({
  title: faker.random.words(),
  description: faker.random.words(),
  text: faker.lorem.text()
})
