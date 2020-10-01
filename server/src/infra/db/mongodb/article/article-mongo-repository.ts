import { MongoHelper } from '../helpers/mongo-helper'
import { AddArticleParams } from '../../../../domain/usecases/article/add-article'
import { ArticleModel } from '../../../../domain/models/article'
import { AddArticleRepository } from '../../../../data/protocols/db/article/add-article-repository'
import { ObjectId } from 'mongodb'
import { QueryBuilder } from '../helpers/query-builder'

export class ArticleMongoRepository implements AddArticleRepository {
  async add (data: AddArticleParams): Promise<ArticleModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const mongoArticle = await articleCollection.insertOne(data)
    const accountCollection = await MongoHelper.getCollection('accounts')
    const authorObject = await accountCollection.findOne({
      _id: new ObjectId(data.authorId)
    })
    const author = MongoHelper.map(authorObject)
    const { authorId, ...rest } = data
    return {
      id: mongoArticle.insertedId,
      author,
      ...rest
    }
  }

  async loadAll (): Promise<ArticleModel[]> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const query = new QueryBuilder()
      .lookup({
        from: 'accounts',
        foreignField: '_id',
        localField: 'authorId',
        as: 'author'
      })
      .unwind({
        path: '$author'
      })
      .project({
        title: 1,
        description: 1,
        text: 1,
        author: {
          id: '$author._id',
          name: 1,
          email: 1
        },
        date: 1
      })
      .sort({
        date: -1
      })
      .build()
    const articles = await articleCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(articles)
  }

  async loadById (id: string): Promise<ArticleModel> {
    const articleCollection = await MongoHelper.getCollection('articles')
    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(id)
      })
      .lookup({
        from: 'accounts',
        foreignField: '_id',
        localField: 'authorId',
        as: 'author'
      })
      .unwind({
        path: '$author'
      })
      .project({
        _id: 0,
        id: '$_id',
        title: 1,
        description: 1,
        text: 1,
        author: {
          id: '$author._id',
          name: 1,
          email: 1
        },
        date: 1
      })
      .build()
    const articleResult = await articleCollection.aggregate(query).toArray()
    return articleResult.length ? articleResult[0] : null
  }
}
