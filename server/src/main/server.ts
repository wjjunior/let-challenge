import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  })
  .catch(console.error)
