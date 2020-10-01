import { gql } from 'apollo-server'

export const typeDefs = gql`
  input AccountInput {
    name: String!
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ArticleInput {
    title: String!
    description: String!
    text: String!
  }
  
  type Account {
    id: ID!
    name: String!
    email: String!
  }

  type Authentication {
    accessToken: String
    name: String
  }

  type Article {
    id: ID!
    title: String!
    description: String!
    text: String!
    author: Account!
    date: String!
  }

  type Query {
    accountByToken(accessToken: String!): Account
    articles: [Article!]
    article(id: ID!): Article
  }

  type Mutation {
    signup(input: AccountInput): Authentication
    login(input: LoginInput): Authentication
    createArticle(input: ArticleInput): Article
  }
`
