import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from '../graphQL'

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    return { token }
  }
})

export default app
